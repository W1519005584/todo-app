import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'title不能为空').max(100, 'title最多100字符'),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(100).optional(),

  completed: z.boolean().optional(),
});
