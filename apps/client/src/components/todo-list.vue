<script setup lang="ts">
import TodoItem from './todo-item.vue';
import EmptyState from './empty-state.vue';

import type { Todo } from '@/types/todo';

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  toggle: [todo: Todo];
  remove: [id: number];
}>();
</script>

<template>
  <view>
    <EmptyState v-if="!todos.length" />

    <view v-else>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', $event)"
        @remove="emit('remove', $event)"
      />
    </view>
  </view>
</template>
