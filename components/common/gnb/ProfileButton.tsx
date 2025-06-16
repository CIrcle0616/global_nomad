'use client';

import { useRouter } from 'next/navigation';
import DropdownMenu from '../DropDown';
import Image from 'next/image';
import profileIcon from '@/public/ic_profile.svg';
import useUserStore from '@/store/useUserStore';

export default function ProfileButton() {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const handleSelect = async (value: string) => {
    switch (value) {
      case '내 정보':
        router.push('/profile/info');
        break;

      case '예약 내역':
        router.push('/profile/reservations');
        break;

      case '내 체험 관리':
        router.push('/profile/activities');
        break;
      case '예약 현황':
        router.push('/profile/schedule');
        break;
      case '로그아웃': //로그아웃 로직 추가 브라우저의 쿠키를 삭제하기 위한 api요청 /api/auth/logout/route.ts에서 처리됨
        try {
          const response = await fetch('/api/auth/logout', { method: 'POST' });
          if (response.ok) {
            logout();
            router.push('/');
            router.refresh();
          } else {
            console.error('로그아웃에 실패했습니다.');
          }
        } catch (error) {
          console.error('로그아웃 요청 중 오류 발생:', error);
        }
        break;
      default:
        break;
    }
  };

  if (!user) return null;

  return (
    <div className="min-w-[110px] text-center">
      <DropdownMenu
        trigger={
          <div className="relative inline-block text-center">
            <button className=" flex items-center gap-1 sm:gap-2 ml-[-10px] transition ease-in-out hover:font-bold hover:scale-105">
              <Image
                src={user.profileImage ?? profileIcon}
                alt="프로필"
                width={1}
                height={1}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
              <span className="text-sm truncate whitespace-nowrap overflow-hidden min-w-0">{user.name}</span>
            </button>
          </div>
        }
        options={['내 정보', '예약 내역', '내 체험 관리', '예약 현황', '로그아웃']}
        onSelect={handleSelect}
      />
    </div>
  );
}
