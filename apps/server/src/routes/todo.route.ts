import { Hono } from 'hono';

import { createTodo, deleteTodo, getTodoList, updateTodo } from '../services/todo.service';

import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';

import { fail, success } from '../utils/response';

const todoRoute = new Hono();

todoRoute.get('/', async c => {
  const list = await getTodoList();

  return c.json(success(list));
});

todoRoute.post('/', async c => {
  const body = await c.req.json();

  const result = createTodoSchema.safeParse(body);

  if (!result.success) {
    return c.json(fail(result.error.issues[0]?.message || '参数错误'), 400);
  }

  const todo = await createTodo(result.data.title);

  return c.json(success(todo));
});

todoRoute.patch('/:id', async c => {
  const id = Number(c.req.param('id'));

  const body = await c.req.json();

  const result = updateTodoSchema.safeParse(body);

  if (!result.success) {
    return c.json(fail(result.error.issues[0]?.message || '参数错误'), 400);
  }

  const todo = await updateTodo(id, result.data);

  return c.json(success(todo));
});

todoRoute.delete('/:id', async c => {
  const id = Number(c.req.param('id'));

  const result = await deleteTodo(id);

  return c.json(success(result));
});

export default todoRoute;
