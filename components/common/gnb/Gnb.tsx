'use client';

import Image from 'next/image';
import Logo from '@/public/ic_logo.svg';
import useUserStore from '@/store/useUserStore';
import AlarmButton from './AlarmButton';
import ProfileButton from './ProfileButton';
import Link from 'next/link';

export default function GNB() {
  const { user } = useUserStore();

  return (
    <header className="fixed bg-white z-50 left-0 top-0 w-full px-2 border-b py-[10px]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-0 flex justify-between items-center h-[60px]">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src={Logo} alt="로고" width={150} className="sm:w-[172px]" />
        </Link>

        {/* 알림 버튼 */}
        {user ? (
          <div className="flex gap-4 lg:gap-[30px] items-center">
            <AlarmButton />
            <div className="h-4 w-px bg-gray-300" />
            <ProfileButton />
          </div>
        ) : (
          <div className="flex gap-[30px] items-center">
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
