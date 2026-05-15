<script setup lang="ts">
import type { Todo } from '@/types/todo';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  toggle: [todo: Todo];
  remove: [id: number];
}>();

const handleToggle = () => {
  emit('toggle', props.todo);
};
</script>

<template>
  <view class="todo-item">
    <view class="todo-content">
      <checkbox :checked="todo.completed" @tap="handleToggle" />

      <text :class="['title', todo.completed ? 'completed' : '']">
        {{ todo.title }}
      </text>
    </view>

    <button class="delete-button" size="mini" @click="emit('remove', todo.id)">删除</button>
  </view>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
  margin-bottom: 20rpx;
  border-radius: 16rpx;
  background: #fff;
}

.todo-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.title {
  font-size: 30rpx;
}

.completed {
  color: #999;
  text-decoration: line-through;
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56rpx;
  line-height: 56rpx;

  padding: 0 24rpx;

  background: #ff4d4f;
  color: #fff;

  border-radius: 8rpx;
  font-size: 24rpx;
}
</style>
