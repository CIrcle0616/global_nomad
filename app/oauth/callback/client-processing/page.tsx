'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function OauthHandlerPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    setIsLoggedIn(true);
    router.replace('/');
  }, [router, setIsLoggedIn]);
  return (
    <div>
      <p>로그인 처리 중입니다...</p>
    </div>
  );
}
