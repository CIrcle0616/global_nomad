import { LoginSuccessResponse, LogoutSuccessResponse, RefreshTokenSuccessResponse } from '@/types/domain/auth/types';
import { fetchWrapper } from './fetchWrapper';

export async function loginUser(body: { email: string; password: string }): Promise<LoginSuccessResponse> {
  return fetchWrapper<LoginSuccessResponse>('/api/auth/login', 'POST', body);
}

export async function logout(accessToken?: string): Promise<LogoutSuccessResponse> {
  return fetchWrapper<LogoutSuccessResponse>('/api/auth/logout', 'POST', undefined, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

export function refreshAuthToken(refreshToken: string): Promise<RefreshTokenSuccessResponse> {
  return fetchWrapper<RefreshTokenSuccessResponse>(`/auth/tokens`, 'POST', undefined, {
    Authorization: `Bearer ${refreshToken}`,
  });
}
