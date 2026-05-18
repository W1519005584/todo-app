import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, '用户名至少 3 个字符').max(32, '用户名最多 32 个字符'),

  password: z.string().min(6, '密码至少 6 个字符').max(64, '密码最多 64 个字符'),

  nickname: z.string().max(32, '昵称最多 32 个字符').optional(),
});

export const loginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),

  password: z.string().min(1, '请输入密码'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
