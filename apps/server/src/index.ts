import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import authRoute from './routes/auth.route';
import todoRoute from './routes/todo.route';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://192.168.1.95:5173',
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', c => {
  return c.json({
    message: 'hello hono',
  });
});

app.route('/auth', authRoute);
app.route('/todos', todoRoute);

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
});

console.log('Server running at http://0.0.0.0:3000');
