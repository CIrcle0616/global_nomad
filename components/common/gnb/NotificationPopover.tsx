'use client';

import { useEffect, useRef } from 'react';

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
      className="overflow-y-auto absolute top-full right-0 border border-gray-200 shadow-md rounded-md z-50"
    >
      {children}
    </div>
  );
}
