<script setup lang="ts">
import { ref } from 'vue';

import { useAppStore } from '@/stores/app.store';
import { useUserStore } from '@/stores/user.store';

const appStore = useAppStore();
const userStore = useUserStore();

const mode = ref<'login' | 'register'>('login');
const username = ref('');
const password = ref('');
const nickname = ref('');

const switchMode = (nextMode: 'login' | 'register') => {
  mode.value = nextMode;
  userStore.error = null;
};

const submit = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'none',
    });

    return;
  }

  try {
    if (mode.value === 'login') {
      await userStore.login({
        username: username.value.trim(),
        password: password.value,
      });
    } else {
      await userStore.register({
        username: username.value.trim(),
        password: password.value,
        nickname: nickname.value.trim() || undefined,
      });
    }

    uni.redirectTo({
      url: '/pages/index/index',
    });
  } catch {
    // request layer and user store already expose the error state.
  }
};
</script>

<template>
  <view class="login-page">
    <view class="header">
      <text class="title">Todo App</text>
      <text class="subtitle">登录后同步你的待办事项</text>
    </view>

    <view class="mode-tabs">
      <button
        class="mode-button"
        :class="{ active: mode === 'login' }"
        @click="switchMode('login')"
      >
        登录
      </button>
      <button
        class="mode-button"
        :class="{ active: mode === 'register' }"
        @click="switchMode('register')"
      >
        注册
      </button>
    </view>

    <view class="form">
      <input v-model="username" class="input" placeholder="用户名" />
      <input v-model="password" class="input" password placeholder="密码" />
      <input
        v-if="mode === 'register'"
        v-model="nickname"
        class="input"
        placeholder="昵称（可选）"
      />

      <view v-if="userStore.error" class="error">
        {{ userStore.error }}
      </view>

      <button class="submit-button" :disabled="appStore.loading" @click="submit">
        {{ appStore.loading ? '处理中...' : mode === 'login' ? '登录' : '注册并登录' }}
      </button>
    </view>
  </view>
</template>

<style scoped>
page {
  background: #f5f7fb;
}

.login-page {
  padding: 56rpx 32rpx;
}

.header {
  margin-bottom: 40rpx;
}

.title {
  display: block;
  color: #1f2937;
  font-size: 52rpx;
  font-weight: 700;
}

.subtitle {
  display: block;
  margin-top: 12rpx;
  color: #6b7280;
  font-size: 28rpx;
}

.mode-tabs {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.mode-button {
  flex: 1;
  height: 80rpx;
  border: 1px solid #d1d5db;
  border-radius: 8rpx;
  background: #fff;
  color: #374151;
  font-size: 28rpx;
  line-height: 80rpx;
}

.mode-button.active {
  border-color: #2563eb;
  background: #2563eb;
  color: #fff;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.input {
  height: 88rpx;
  border: 1px solid #d1d5db;
  border-radius: 8rpx;
  background: #fff;
  padding: 0 24rpx;
  color: #111827;
  font-size: 30rpx;
}

.error {
  color: #dc2626;
  font-size: 26rpx;
}

.submit-button {
  height: 88rpx;
  border-radius: 8rpx;
  background: #111827;
  color: #fff;
  font-size: 30rpx;
  line-height: 88rpx;
}

.submit-button[disabled] {
  background: #9ca3af;
  color: #fff;
}
</style>
