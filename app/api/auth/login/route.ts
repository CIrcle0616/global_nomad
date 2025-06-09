import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  let backendResponse: Response;

  try {
    const clientRequestBody = await request.json();

    backendResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientRequestBody),
    });

    const backendResponseBodyClone = backendResponse.clone();

    if (!backendResponse.ok) {
      console.error('로그인에 실패했습니다.', backendResponse.status, backendResponse.statusText);
      const errorBody = await backendResponseBodyClone.text();
      const errorHeaders = new Headers(backendResponse.headers);

      return new NextResponse(errorBody, {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        headers: errorHeaders,
      });
    }

    const backendData = await backendResponseBodyClone.json();

    const { accessToken, refreshToken } = backendData;

    const cookieStore = await cookies();

    if (accessToken) {
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 15,
      });
    }

    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    const responseBody = JSON.stringify(backendData);
    const responseHeaders = new Headers(backendResponse.headers);
    responseHeaders.set('Content-Type', 'application/json');

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('로그인 요청에 실패했습니다.', error);

    return new NextResponse(JSON.stringify({ message: '내부 서버 오류' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
