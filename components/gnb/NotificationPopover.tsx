'use client';

import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';

type NotificationPopoverProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function NotificationPopover({ children, onClose }: NotificationPopoverProps) {
  return (
    <div
      className={`
        
        z-50
        fixed inset-0
        bg-white
        overflow-y-auto
        sm:absolute sm:inset-auto sm:top-full sm:right-0
        sm:w-[360px] sm:max-h-[80vh]
        sm:mt-[9px]
        sm:rounded-md sm:shadow-lg sm:border sm:border-gray-200
        lg:right-[-80px]
        `}
    >
      <button className="absolute top-4 right-4 sm:hidden z-[999]" onClick={onClose}>
        <Image src={closeIcon} alt="닫기" width={24} height={24} />
      </button>
      {children}
    </div>
  );
}
