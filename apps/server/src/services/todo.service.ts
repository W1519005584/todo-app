import { eq } from 'drizzle-orm';

import { db } from '../db';
import { todos } from '../db/schema';

export async function getTodoList() {
  return db.select().from(todos);
}

export async function createTodo(title: string) {
  return db
    .insert(todos)
    .values({
      title,
    })
    .returning();
}

export async function updateTodo(
  id: number,
  data: {
    title?: string;
    completed?: boolean;
  }
) {
  return db.update(todos).set(data).where(eq(todos.id, id)).returning();
}

export async function deleteTodo(id: number) {
  return db.delete(todos).where(eq(todos.id, id)).returning();
}
