'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';

type NotificationPopoverProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function NotificationPopover({ children, onClose }: NotificationPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={`z-50 overflow-y-auto fixed top-0 left-0 w-screen h-screen bg-white sm:absolute sm:top-full sm:right-0 sm:translate-x-[-120px] lg:translate-x-[-60px] sm:w-[360px] sm:h-auto sm:rounded-md sm:shadow-md sm:border sm:border-gray-200 sm:bg-white`}
    >
      <button className="absolute top-4 right-4 sm:hidden" onClick={onClose}>
        <Image src={closeIcon} alt="닫기" width={24} height={24} />
      </button>
      {children}
    </div>
  );
}
