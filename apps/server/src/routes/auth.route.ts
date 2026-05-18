import { Hono } from 'hono';

import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { getUserById, loginUser, registerUser } from '../services/auth.service';
import { verifyToken } from '../utils/jwt';
import { fail, success } from '../utils/response';

const authRoute = new Hono();

authRoute.post('/register', async c => {
  const body = await c.req.json();
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return c.json(fail(result.error.issues[0]?.message || '参数错误'), 400);
  }

  try {
    const authResult = await registerUser(result.data);

    return c.json(success(authResult));
  } catch (error: any) {
    return c.json(fail(error?.message || '注册失败'), 400);
  }
});

authRoute.post('/login', async c => {
  const body = await c.req.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return c.json(fail(result.error.issues[0]?.message || '参数错误'), 400);
  }

  try {
    const authResult = await loginUser(result.data);

    return c.json(success(authResult));
  } catch (error: any) {
    return c.json(fail(error?.message || '登录失败'), 401);
  }
});

authRoute.get('/me', async c => {
  const authorization = c.req.header('Authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return c.json(fail('未登录', 401), 401);
  }

  const payload = verifyToken(token);

  if (!payload) {
    return c.json(fail('登录已过期', 401), 401);
  }

  const user = await getUserById(payload.userId);

  if (!user) {
    return c.json(fail('用户不存在', 404), 404);
  }

  return c.json(success(user));
});

export default authRoute;
