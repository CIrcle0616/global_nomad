import { LoginSuccessResponse, LogoutSuccessResponse, RefreshTokenSuccessResponse } from '@/types/domain/auth/types';
import { fetchWrapper } from './fetchWrapper';

// 로그인
export async function loginUser(body: { email: string; password: string }): Promise<LoginSuccessResponse> {
  return fetchWrapper<LoginSuccessResponse>('/api/auth/login', 'POST', body);
}

export async function logout(): Promise<LogoutSuccessResponse> {
  return fetchWrapper<LogoutSuccessResponse>('/api/auth/logout', 'POST');
}

// 토큰 재발급
export function authToken(): Promise<RefreshTokenSuccessResponse> {
  return fetchWrapper<RefreshTokenSuccessResponse>(`/auth/tokens`, 'POST');
}
