import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),

  userId: integer('user_id'),

  completed: integer('completed', {
    mode: 'boolean',
  }).default(false),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  username: text('username').notNull().unique(),

  passwordHash: text('password_hash').notNull(),

  nickname: text('nickname'),

  createdAt: text('created_at').notNull(),
});
