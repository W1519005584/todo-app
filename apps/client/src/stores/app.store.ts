import { defineStore } from 'pinia';

interface AppState {
  loading: boolean;

  loadingCount: number;

  initialized: boolean;

  token: string;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    loading: false,

    loadingCount: 0,

    initialized: false,

    token: '',
  }),

  actions: {
    startLoading() {
      this.loadingCount += 1;

      this.loading = true;
    },

    endLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount -= 1;
      }

      this.loading = this.loadingCount > 0;
    },

    setToken(token: string) {
      this.token = token;

      uni.setStorageSync('token', token);
    },

    clearToken() {
      this.token = '';

      uni.removeStorageSync('token');
    },

    initializeApp() {
      const token = uni.getStorageSync('token');

      if (token) {
        this.token = token;
      }

      this.initialized = true;
    },
  },
});
