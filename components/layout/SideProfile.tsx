'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
import useUserStore from '@/store/useUserStore';
import { useModalStore } from '@/store/modalStore';
import ProfileImageUploader from '@/components/common/ProfileImageUploader';
import OneButtonModal from '@/components/common/modal/OneButtonModal';
import { getUserMe } from '@/services/users';

const menuItems = [
  {
    name: '내 정보',
    path: '/profile/info',
    icon: '/ic_account_check.svg',
    iconGray: '/ic_account_gray.svg',
  },
  {
    name: '예약 내역',
    path: '/profile/reservations',
    icon: '/ic_textbox_check.svg',
    iconGray: '/ic_textbox_gray.svg',
  },
  {
    name: '내 체험 관리',
    path: '/profile/activities',
    icon: '/ic_cog.svg',
    iconGray: '/ic_cog_gray.svg',
  },
  {
    name: '예약 현황',
    path: '/profile/schedule',
    icon: '/ic_calendar_check.svg',
    iconGray: '/ic_calendar_gray.svg',
  },
];

export default function SideProfile() {
  const pathname = usePathname();
  const { openModal } = useModalStore();
  const { setUser } = useUserStore();

  const imageUploadMutation = useProfileImageUpload(
    async () => {
      openModal(OneButtonModal, {
        content: '프로필 이미지가 수정되었습니다.',
        onConfirm: () => {},
      });

      try {
        const updatedUser = await getUserMe();
        setUser({
          id: updatedUser.id,
          name: updatedUser.nickname,
          profileImage: updatedUser.profileImageUrl ?? undefined,
          teamId: 14 - 3,
          accessToken: '',
        });
      } catch (e) {
        console.error('유저 정보 수정에 실패했습니다', e);
      }
    },
    error => {
      openModal(OneButtonModal, {
        content: `프로필 이미지 업로드에 실패했습니다. ${error.message}`,
        onConfirm: () => {},
      });
    },
  );

  return (
    <div
      className="fixed z-30 bg-white border border-gray-300 rounded-xl shadow-md p-6 h-fit
w-full max-w-[251px] lg:max-w-[384px]"
    >
      <ProfileImageUploader
        onFileSelected={file => {
          imageUploadMutation.mutate(file);
        }}
      />

      <ul className="space-y-2 w-full mt-4">
        {menuItems.map(({ name, path, icon, iconGray }) => {
          const isActive = pathname.startsWith(path);
          const iconToUse = isActive ? icon : iconGray;

          return (
            <li key={path}>
              <Link
                href={path}
                className={`flex items-center gap-3 px-4 py-2 w-full rounded-[12px] ${
                  isActive ? 'bg-green-300 text-black lg-bold font-bold' : 'text-gray-700 lg-regular hover:bg-gray-100'
                }`}
              >
                <Image src={iconToUse} alt={`${name} 아이콘`} width={20} height={20} />
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
