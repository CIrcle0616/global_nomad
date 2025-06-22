//lib/fetchFromServer.ts
import { cookies } from 'next/headers';

export async function fetchFromServer(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }
  return res;
}
