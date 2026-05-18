import { defineStore } from 'pinia';

import * as todoApi from '@/api/todo';

import type { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

interface TodoState {
  todos: Todo[];
  error: string | null;
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: [],
    error: null,
  }),

  actions: {
    async fetchTodos() {
      this.error = null;

      try {
        const res = await todoApi.getTodos();

        this.todos = res.data;
      } catch (error: any) {
        this.error = error?.message || '获取 Todo 失败';
      }
    },

    async createTodo(payload: CreateTodoDto) {
      try {
        const res = await todoApi.createTodo(payload);

        const todo = res.data[0];

        if (todo) {
          this.todos.unshift(todo);
        }
      } catch (error: any) {
        this.error = error?.message || '创建 Todo 失败';
      }
    },

    async updateTodo(id: number, payload: UpdateTodoDto) {
      try {
        const res = await todoApi.updateTodo(id, payload);

        const updatedTodo = res.data[0];

        const index = this.todos.findIndex(item => item.id === id);

        if (index !== -1 && updatedTodo) {
          this.todos[index] = {
            ...this.todos[index],

            ...updatedTodo,
          };
        }
      } catch (error: any) {
        this.error = error?.message || '更新 Todo 失败';
      }
    },

    async deleteTodo(id: number) {
      try {
        await todoApi.deleteTodo(id);

        this.todos = this.todos.filter(item => item.id !== id);
      } catch (error: any) {
        this.error = error?.message || '删除 Todo 失败';
      }
    },
  },
});
