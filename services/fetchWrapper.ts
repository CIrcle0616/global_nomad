import { HttpError } from '@/constants/utils/errors';

const PROXY_API_PREFIX = '/api/proxy';

export async function fetchWrapper<T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: unknown,
  customHeaders: Record<string, string> = {},
): Promise<T> {

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
    ...customHeaders,
  };

  const requestUrl = url.startsWith('/api') ? `${url}` : `${PROXY_API_PREFIX}${url.startsWith('/') ? url : `/${url}`}`;

  const response = await fetch(`${baseUrl}${requestUrl}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
    }
    throw new HttpError(result?.message || 'API 요청 실패', response.status);
  }

  return result;
}
