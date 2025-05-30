import { LoginSuccessResponse, RefreshTokenSuccessResponse } from '@/types/domain/auth/types';
import { fetchWrapper } from './fetchWrapper';

// 로그인
export function loginUser(teamId: string, body: { email: string; password: string }): Promise<LoginSuccessResponse> {
  return fetchWrapper<LoginSuccessResponse>(`/${teamId}/auth/login`, 'POST', body);
}

// 토큰 재발급
export function authToken(teamId: string): Promise<RefreshTokenSuccessResponse> {
  return fetchWrapper<RefreshTokenSuccessResponse>(`/${teamId}/auth/tokens`, 'POST');
}
