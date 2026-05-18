import { Hono } from 'hono';

import { createTodo, deleteTodo, getTodoList, updateTodo } from '../services/todo.service';

import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';

import { authMiddleware, type AuthVariables } from '../middlewares/auth.middleware';
import { fail, success } from '../utils/response';

const todoRoute = new Hono<{
  Variables: AuthVariables;
}>();

todoRoute.use('*', authMiddleware);

todoRoute.get('/', async c => {
  const userId = c.get('userId');
  const list = await getTodoList(userId);

  return c.json(success(list));
});

todoRoute.post('/', async c => {
  const body = await c.req.json();

  const result = createTodoSchema.safeParse(body);

  if (!result.success) {
    return c.json(fail(result.error.issues[0]?.message || '参数错误'), 400);
  }

  const userId = c.get('userId');
  const todo = await createTodo(userId, result.data.title);

  return c.json(success(todo));
});

todoRoute.patch('/:id', async c => {
  const id = Number(c.req.param('id'));

  const body = await c.req.json();

  const result = updateTodoSchema.safeParse(body);

  if (!result.success) {
    return c.json(fail(result.error.issues[0]?.message || '参数错误'), 400);
  }

  const userId = c.get('userId');
  const todo = await updateTodo(userId, id, result.data);

  return c.json(success(todo));
});

todoRoute.delete('/:id', async c => {
  const id = Number(c.req.param('id'));
  const userId = c.get('userId');

  const result = await deleteTodo(userId, id);

  return c.json(success(result));
});

export default todoRoute;
