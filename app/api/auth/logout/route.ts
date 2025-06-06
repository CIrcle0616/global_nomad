import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: '성공적으로 로그아웃 했습니다.' }, { status: 200 });
  } catch (error) {
    console.error('로그아웃 에러', error);
    return NextResponse.json({ error: 'Internal server error during logout' }, { status: 500 });
  }
}
