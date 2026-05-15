<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  submit: [title: string];
}>();

const title = ref('');

const handleSubmit = () => {
  const value = title.value.trim();

  if (!value) {
    uni.showToast({
      title: '请输入内容',
      icon: 'none',
    });

    return;
  }

  emit('submit', value);

  title.value = '';
};
</script>

<template>
  <view class="todo-input">
    <input
      v-model="title"
      class="input"
      placeholder="请输入 Todo"
      confirm-type="done"
      @confirm="handleSubmit"
    />

    <button class="button primary-button" size="mini" @click="handleSubmit">添加</button>
  </view>
</template>

<style scoped>
.todo-input {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.input {
  flex: 1;

  height: 72rpx;

  border: 1rpx solid #ddd;
  border-radius: 12rpx;

  padding: 0 24rpx;

  background: #fff;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140rpx;
  height: 72rpx;

  line-height: 72rpx;

  padding: 0;
  margin: 0;
}

.primary-button {
  background: #1677ff;
  color: #fff;

  font-size: 28rpx;

  border-radius: 12rpx;
}
</style>
