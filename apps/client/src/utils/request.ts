import type { ApiResponse } from '@/types/request';
import { useAppStore } from '@/stores/app.store';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  url: string;

  method?: RequestMethod;

  data?: any;

  header?: Record<string, string>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function request<T>({
  url,

  method = 'GET',

  data,

  header,
}: RequestOptions) {
  const appStore = useAppStore();
  const token = appStore.token;

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,

      method: method as any,

      data,

      timeout: 10000,

      header: {
        'Content-Type': 'application/json',

        Authorization: token ? `Bearer ${token}` : '',

        ...header,
      },

      success: res => {
        const result = res.data as ApiResponse<T>;

        if (result.code !== 0) {
          uni.showToast({
            title: result.message || '请求失败',

            icon: 'none',
          });

          reject(result);

          return;
        }

        resolve(result);
      },

      fail: err => {
        uni.showToast({
          title: '网络错误',

          icon: 'none',
        });

        reject(err);
      },
    });
  });
}
