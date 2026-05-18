import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { users } from '../db/schema';
import type { LoginDto, RegisterDto } from '../schemas/auth.schema';
import { signToken } from '../utils/jwt';

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');

  return `${salt}:${hash}`;
}

function verifyPassword(password: string, passwordHash: string) {
  const [salt, hash] = passwordHash.split(':');

  if (!salt || !hash) {
    return false;
  }

  const inputHash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hash, 'hex');

  return inputHash.length === storedHash.length && timingSafeEqual(inputHash, storedHash);
}

function toUserInfo(user: typeof users.$inferSelect) {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    createdAt: user.createdAt,
  };
}

function createAuthResult(user: typeof users.$inferSelect) {
  return {
    token: signToken({
      userId: user.id,
      username: user.username,
    }),
    user: toUserInfo(user),
  };
}

export async function registerUser(payload: RegisterDto) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, payload.username))
    .get();

  if (existingUser) {
    throw new Error('用户名已存在');
  }

  const [user] = await db
    .insert(users)
    .values({
      username: payload.username,
      passwordHash: hashPassword(payload.password),
      nickname: payload.nickname || payload.username,
      createdAt: new Date().toISOString(),
    })
    .returning();

  if (!user) {
    throw new Error('注册失败');
  }

  return createAuthResult(user);
}

export async function loginUser(payload: LoginDto) {
  const user = await db.select().from(users).where(eq(users.username, payload.username)).get();

  if (!user || !verifyPassword(payload.password, user.passwordHash)) {
    throw new Error('用户名或密码错误');
  }

  return createAuthResult(user);
}

export async function getUserById(id: number) {
  const user = await db.select().from(users).where(eq(users.id, id)).get();

  return user ? toUserInfo(user) : null;
}
