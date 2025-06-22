'use client';

import { useRouter } from 'next/navigation';
import DropdownMenu from '../common/DropDown';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { UserServiceResponseDto as User } from '@/types';

interface ProfileButtonProps {
  user?: User;
}

export default function ProfileButton({ user }: ProfileButtonProps) {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useAuthStore();
  const queryClient = useQueryClient();

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
            setIsLoggedIn(false);
            setUser(null);
            queryClient.removeQueries({ queryKey: ['myInfo'] });
            queryClient.removeQueries({ queryKey: ['myNotificationAlarm'] });
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
    <div className="text-center min-w-[50px]">
      <DropdownMenu
        trigger={
          <button className="lg:min-w-[90px]  flex items-center gap-2 transition ease-in-out hover:font-bold hover:scale-105">
            <Image
              src={user.profileImageUrl ?? '/ic_profile.svg'}
              alt="프로필"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm truncate whitespace-nowrap overflow-hidden min-w-0">{user.nickname}</span>
          </button>
        }
        options={['내 정보', '예약 내역', '내 체험 관리', '예약 현황', '로그아웃']}
        onSelect={handleSelect}
      />
    </div>
  );
}
