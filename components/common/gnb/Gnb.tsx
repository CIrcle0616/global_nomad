'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/ic_logo.svg';
import useUserStore from '@/store/useUserStore';
import AlarmButton from './AlarmButton';
import ProfileButton from './ProfileButton';

export default function GNB() {
  const router = useRouter();
  const { user } = useUserStore();

  const goToMain = () => router.push('/');

  return (
    <header className="w-full px-2 py-2 border-b py-[10px]">
      <div className="mx-auto flex justify-between items-center px-1 sm:px-6 lg:px-[100px] max-w-[1440px]">
        <button onClick={goToMain} className="flex items-center gap-2">
          <Image src={Logo} alt="로고" width={130} className="sm:w-[172px]" />
        </button>

        {/* 알림 버튼 */}
        {user ? (
          <div className="flex items-center mt-2 mx-4 gap-1 sm:gap-2 ml-auto">
            <AlarmButton />
            <ProfileButton />
          </div>
        ) : (
          <div className="flex gap-[30px] ml-auto">
            <button
              onClick={() => router.push('/login')}
              className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
            >
              로그인
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="text-md-medium text-black transition ease-in-out hover:font-bold hover:scale-105"
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
