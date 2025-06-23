'use client';

import Image from 'next/image';
import Logo from '@/public/ic_logo.svg';
import AlarmButton from './AlarmButton';
import ProfileButton from './ProfileButton';
import Link from 'next/link';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { useMyInfoQuery } from '@/hooks/useMyInfoQuery';
import { useAuthStore } from '@/store/useAuthStore';

export default function GNB() {
  const { isLoggedIn } = useAuthStore();
  const hasHydrated = useHasHydrated();
  const { data: user, isLoading } = useMyInfoQuery();

  if (!hasHydrated || isLoading) return null;

  const isLoggedOut = !isLoggedIn && !user;

  return (
    <header className="fixed bg-white z-50 left-0 top-0 w-full px-4 border-b py-[20px]">
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
        <Link href={'/'}>
          <Image src={Logo} alt="로고" width={172} className="sm:w-[172px]" />
        </Link>

        {/* 알림 버튼 */}
        {!isLoggedOut ? (
          <div className="flex gap-[12px] md:gap-[25px] items-center">
            <AlarmButton />
            <div className="h-4 w-px bg-gray-300" />
            <ProfileButton />
          </div>
        ) : (
          <div className="flex gap-[25px] items-center">
            <Link
              href={'/login'}
              className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
            >
              로그인
            </Link>
            <Link
              href={'/signup'}
              className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
