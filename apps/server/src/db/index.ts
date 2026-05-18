import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('./db/sqlite.db');

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    username text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    nickname text,
    created_at text NOT NULL
  );
`);

try {
  sqlite.exec('ALTER TABLE todos ADD COLUMN user_id integer;');
} catch (error: any) {
  const message = String(error?.message || '');

  if (!message.includes('duplicate column name')) {
    throw error;
  }
}

export const db = drizzle(sqlite);
