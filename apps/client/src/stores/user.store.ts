import { defineStore } from 'pinia';

import * as authApi from '@/api/auth';
import { useAppStore } from '@/stores/app.store';

import type { LoginDto, RegisterDto, UserInfo } from '@/types/user';

interface UserState {
  userInfo: UserInfo | null;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    error: null,
  }),

  actions: {
    setAuth(token: string, userInfo: UserInfo) {
      const appStore = useAppStore();

      appStore.setToken(token);
      this.userInfo = userInfo;
    },

    async login(payload: LoginDto) {
      this.error = null;

      try {
        const res = await authApi.login(payload);

        this.setAuth(res.data.token, res.data.user);
      } catch (error: any) {
        this.error = error?.message || '登录失败';

        throw error;
      }
    },

    async register(payload: RegisterDto) {
      this.error = null;

      try {
        const res = await authApi.register(payload);

        this.setAuth(res.data.token, res.data.user);
      } catch (error: any) {
        this.error = error?.message || '注册失败';

        throw error;
      }
    },

    async fetchCurrentUser() {
      this.error = null;

      try {
        const res = await authApi.getCurrentUser();

        this.userInfo = res.data;
      } catch (error: any) {
        this.error = error?.message || '获取用户信息失败';
      }
    },

    logout() {
      const appStore = useAppStore();

      appStore.clearToken();
      this.userInfo = null;
      this.error = null;

      uni.redirectTo({
        url: '/pages/login/index',
      });
    },
  },
});
