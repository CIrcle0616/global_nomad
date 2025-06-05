import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BASE_URL = process.env.BASE_URL;

async function refreshAccessToken(refreshTokenValue: string): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/auth/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    });

    if (!response.ok) {
      console.error('Failed to refresh access token');
      return null;
    }

    const { accessToken, refreshToken: newRefreshToken } = await response.json();

    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 15,
    });

    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const path = await params.path.join('/');
  const targetUrl = `${BASE_URL}/${path}${req.nextUrl.search}`;

  const makeRequest = async (token: string | undefined) => {
    const headers = new Headers(req.headers);
    headers.delete('cookie');
    headers.delete('host');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    let body: BodyInit | null | undefined = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = JSON.stringify(await req.json());
      } else if (contentType?.includes('multipart/form-data')) {
        body = await req.blob();
      } else {
        body = await req.text();
      }
    }

    return fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });
  };

  let response = await makeRequest(accessToken);

  if (response.status === 401 && refreshToken) {
    console.log('Access token expired. Attempting refresh...');
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      console.log('Access token refreshed. Retrying original request...');
      response = await makeRequest(newAccessToken);
    } else {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');

      return new NextResponse(JSON.stringify({ error: '토큰 재발급이 불가합니다, 다시 로그인 해주세요.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const responseBody = await response.json();
  const responseHeaders = new Headers();
  responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'application/json');

  return new NextResponse(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
