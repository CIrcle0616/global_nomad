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
    <header className="w-full px-2 border-b py-[10px]">
      <div className="mx-auto flex justify-between items-center px-1 sm:px-6 lg:px-[100px] max-w-[1440px]">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src={Logo} alt="로고" width={130} className="sm:w-[172px]" />
        </Link>

        {/* 알림 버튼 */}
        {user ? (
          <div className="flex items-center mt-2 mx-4 gap-1 sm:gap-2 ml-auto">
            <AlarmButton />
            <ProfileButton />
          </div>
        ) : (
          <div className="flex gap-[30px] ml-auto">
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
