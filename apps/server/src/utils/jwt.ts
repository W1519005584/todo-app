import { createHmac, timingSafeEqual } from 'node:crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'todo-app-dev-secret';
const JWT_EXPIRES_IN = 60 * 60 * 24 * 7;

interface JwtPayload {
  userId: number;
  username: string;
  exp?: number;
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4);

  return Buffer.from(`${normalized}${padding}`, 'base64').toString('utf8');
}

function signContent(content: string) {
  return base64UrlEncode(createHmac('sha256', JWT_SECRET).update(content).digest());
}

export function signToken(payload: Omit<JwtPayload, 'exp'>) {
  const header = base64UrlEncode(
    JSON.stringify({
      alg: 'HS256',
      typ: 'JWT',
    })
  );

  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN,
    })
  );

  const content = `${header}.${body}`;

  return `${content}.${signContent(content)}`;
}

export function verifyToken(token: string): JwtPayload | null {
  const [header, body, signature] = token.split('.');

  if (!header || !body || !signature) {
    return null;
  }

  const content = `${header}.${body}`;
  const expectedSignature = signContent(content);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  let payload: JwtPayload;

  try {
    payload = JSON.parse(base64UrlDecode(body)) as JwtPayload;
  } catch {
    return null;
  }

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}
