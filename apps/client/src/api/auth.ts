import { request } from '@/utils/request';

import type { AuthResult, LoginDto, RegisterDto, UserInfo } from '@/types/user';

export function login(payload: LoginDto) {
  return request<AuthResult>({
    url: '/auth/login',

    method: 'POST',

    data: payload,
  });
}

export function register(payload: RegisterDto) {
  return request<AuthResult>({
    url: '/auth/register',

    method: 'POST',

    data: payload,
  });
}

export function getCurrentUser() {
  return request<UserInfo>({
    url: '/auth/me',
  });
}
