'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function OauthHandlerPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();
  setIsLoggedIn(true);
  router.push('/');
}
