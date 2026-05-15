<script setup lang="ts">
import { onMounted } from 'vue';

import TodoInput from '@/components/todo-input.vue';
import TodoList from '@/components/todo-list.vue';

import { useTodoStore } from '@/stores/todo.store';

import type { Todo } from '@/types/todo';
import { useAppStore } from '@/stores/app.store';

const appStore = useAppStore();

const todoStore = useTodoStore();

const loadTodos = async () => {
  await todoStore.fetchTodos();
};

const handleAddTodo = async (title: string) => {
  await todoStore.createTodo({
    title,
  });
};

const handleToggleTodo = async (todo: Todo) => {
  await todoStore.updateTodo(todo.id, {
    completed: !todo.completed,
  });
};

const handleDeleteTodo = async (id: number) => {
  await todoStore.deleteTodo(id);
};

onMounted(() => {
  loadTodos();
});
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title"> Todo App </text>
    </view>

    <TodoInput @submit="handleAddTodo" />

    <view v-if="appStore.loading" class="loading"> 加载中... </view>

    <view v-else-if="todoStore.error" class="error">
      {{ todoStore.error }}
    </view>

    <TodoList
      v-else
      :todos="todoStore.todos"
      @toggle="handleToggleTodo"
      @remove="handleDeleteTodo"
    />
  </view>
</template>

<style scoped>
page {
  background: #f5f5f5;
}
.container {
  padding: 32rpx;
}

.header {
  margin-bottom: 40rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
}

.loading {
  text-align: center;
  color: #666;
  padding: 40rpx 0;
}

.error {
  color: red;
  padding: 40rpx 0;
}
</style>
