import { LoginSuccessResponse, RefreshTokenSuccessResponse } from '@/types/domain/auth/types';
import { fetchWrapper } from './fetchWrapper';

// 로그인
export function loginUser(body: { email: string; password: string }): Promise<LoginSuccessResponse> {
  return fetchWrapper<LoginSuccessResponse>(`/auth/login`, 'POST', body);
}

// 토큰 재발급
export function authToken(): Promise<RefreshTokenSuccessResponse> {
  return fetchWrapper<RefreshTokenSuccessResponse>(`/auth/tokens`, 'POST');
}
