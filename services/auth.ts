import { fetchWrapper } from './fetchWrapper';

// 로그인
export function loginUser(teamId: string, body: { email: string; password: string }) {
  return fetchWrapper(`/${teamId}/auth/login`, 'POST', body);
}

// 토큰 재발급
export function authToken(teamId: string) {
  return fetchWrapper(`/${teamId}/auth/tokens`, 'POST');
}
