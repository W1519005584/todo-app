import { createMiddleware } from 'hono/factory';

import { verifyToken } from '../utils/jwt';
import { fail } from '../utils/response';

export interface AuthVariables {
  userId: number;
  username: string;
}

export const authMiddleware = createMiddleware<{
  Variables: AuthVariables;
}>(async (c, next) => {
  const authorization = c.req.header('Authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return c.json(fail('未登录', 401), 401);
  }

  const payload = verifyToken(token);

  if (!payload) {
    return c.json(fail('登录已过期', 401), 401);
  }

  c.set('userId', payload.userId);
  c.set('username', payload.username);

  await next();
});
