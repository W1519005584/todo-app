import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import { useAppStore } from '@/stores/app.store';

import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);

  const pinia = createPinia();
  app.use(pinia);

  const appStore = useAppStore(pinia);

  appStore.initializeApp();

  return {
    app,
  };
}
