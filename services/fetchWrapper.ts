import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = 'https://sp-globalnomad-api.vercel.app/14-3';

export async function fetchWrapper<T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: unknown,
  customHeaders: Record<string, string> = {},
): Promise<T> {
  const accessToken = useAuthStore.getState().accessToken;

  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
    ...customHeaders,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'API 요청 실패');
  }

  return result;
}
