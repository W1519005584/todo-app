import { and, eq } from 'drizzle-orm';

import { db } from '../db';
import { todos } from '../db/schema';

export async function getTodoList(userId: number) {
  return db.select().from(todos).where(eq(todos.userId, userId));
}

export async function createTodo(userId: number, title: string) {
  return db
    .insert(todos)
    .values({
      title,
      userId,
    })
    .returning();
}

export async function updateTodo(
  userId: number,
  id: number,
  data: {
    title?: string;
    completed?: boolean;
  }
) {
  return db
    .update(todos)
    .set(data)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();
}

export async function deleteTodo(userId: number, id: number) {
  return db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .returning();
}
