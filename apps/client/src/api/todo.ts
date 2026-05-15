import { request } from '@/utils/request';

import type { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

export function getTodos() {
  return request<Todo[]>({
    url: '/todos',
  });
}

export function createTodo(payload: CreateTodoDto) {
  return request<Todo[]>({
    url: '/todos',

    method: 'POST',

    data: payload,
  });
}

export function updateTodo(id: number, payload: UpdateTodoDto) {
  return request<Todo[]>({
    url: `/todos/${id}`,

    method: 'PATCH',

    data: payload,
  });
}

export function deleteTodo(id: number) {
  return request<null>({
    url: `/todos/${id}`,

    method: 'DELETE',
  });
}
