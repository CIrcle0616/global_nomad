'use server'; // 이 파일의 모든 함수는 서버 액션이 됩니다.

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleLogout() {
  try {
    // 1. Route Handler의 핵심 로직을 그대로 가져옵니다.
    // NextResponse를 사용하지 않는다는 점만 다릅니다.
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    console.log('서버 액션을 통해 로그아웃 성공: 쿠키 삭제 완료');
  } catch (error) {
    console.error('서버 액션 로그아웃 중 에러 발생:', error);
    // 에러가 발생했음을 클라이언트에 알릴 수 있습니다.
    return;
  }
  revalidatePath('/');
  // revalidatePath('/mypage'); // 마이페이지 등 관련 페이지도 추가

  // 로그아웃 후 사용자를 홈페이지로 보냅니다.
  redirect('/');

  // redirect()는 에러를 throw하므로 그 아래 코드는 실행되지 않습니다.
  // 따라서 일반적으로는 try...catch 블록 바깥에 둡니다.
}
