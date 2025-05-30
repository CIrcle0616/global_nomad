import { fetchWrapper } from './fetchWrapper';

// 로그인
export function loginUser(body: { email: string; password: string }) {
  return fetchWrapper(`/auth/login`, 'POST', body);
}

// 토큰 재발급
export function authToken() {
  return fetchWrapper(`/auth/tokens`, 'POST');
}
