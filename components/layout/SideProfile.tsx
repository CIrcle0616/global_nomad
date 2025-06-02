'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProfileImageUploader from '@/components/common/ProfileImageUploader';

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

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 w-full h-fit shrink-0">
      <ProfileImageUploader />

      <ul className="space-y-2 w-full">
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
