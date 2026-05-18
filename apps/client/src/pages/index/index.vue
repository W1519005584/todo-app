<script setup lang="ts">
import { onMounted } from 'vue';

import TodoInput from '@/components/todo-input.vue';
import TodoList from '@/components/todo-list.vue';

import { useTodoStore } from '@/stores/todo.store';

import type { Todo } from '@/types/todo';
import { useAppStore } from '@/stores/app.store';
import { useUserStore } from '@/stores/user.store';

const appStore = useAppStore();

const todoStore = useTodoStore();
const userStore = useUserStore();

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

const handleLogout = () => {
  userStore.logout();
};

onMounted(async () => {
  if (!appStore.token) {
    uni.redirectTo({
      url: '/pages/login/index',
    });

    return;
  }

  await userStore.fetchCurrentUser();

  if (!appStore.token) {
    return;
  }

  await loadTodos();
});
</script>

<template>
  <view class="container">
    <view class="header">
      <view>
        <text class="title"> Todo App </text>
        <text v-if="userStore.userInfo" class="user">
          {{ userStore.userInfo.nickname || userStore.userInfo.username }}
        </text>
      </view>

      <button class="logout-button" @click="handleLogout">退出</button>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
}

.user {
  display: block;
  margin-top: 8rpx;
  color: #666;
  font-size: 26rpx;
}

.logout-button {
  flex: 0 0 auto;
  width: 120rpx;
  height: 64rpx;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  background: #fff;
  color: #333;
  font-size: 26rpx;
  line-height: 64rpx;
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
