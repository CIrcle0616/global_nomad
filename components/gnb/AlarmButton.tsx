'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import NotificationPopover from './NotificationPopover';
import NotificationList from './NotificationList';
import Image from 'next/image';
import alarmIcon from '@/public/ic_alarm.svg';
import { useQuery } from '@tanstack/react-query';
import { getMyNotifications } from '@/services/myNotifications';
import { UserServiceResponseDto as User } from '@/types';

interface AlarmButtonProps {
  user?: User;
}

export default function AlarmButton({ user }: AlarmButtonProps) {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ['myNotificationAlarm'],
    queryFn: () => getMyNotifications({ size: 10 }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!user,
  });

  const notificationsArray = useMemo(() => {
    return Array.isArray(data?.notifications) ? data.notifications : [];
  }, [data]);

  useEffect(() => {
    const lastCheckedAtRaw = localStorage.getItem('lastNotificationCheckedAt');
    const lastCheckedAt = lastCheckedAtRaw ? new Date(lastCheckedAtRaw) : new Date(0);

    const hasNew = notificationsArray.some(n => {
      const createdAt = new Date(n.createdAt);
      return createdAt > lastCheckedAt;
    });

    setHasNewNotification(hasNew);
  }, [notificationsArray]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsAlarmOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleClick = () => {
    setIsAlarmOpen(prev => !prev);

    setHasNewNotification(false); //알람 열면 점 제거

    //알림 확인 시간 저장 -> 점 활성화할지 비활성화할지 정하게 됨
    localStorage.setItem('lastNotificationCheckedAt', new Date().toISOString());
  };

  const handleClose = () => {
    setIsAlarmOpen(false);
  };

  return (
    <div ref={wrapperRef} className="flex relative items-center">
      <button
        onClick={e => {
          e.stopPropagation();
          handleClick();
        }}
        className="transition ease-in-out hover:font-bold hover:scale-105"
      >
        <Image src={alarmIcon} alt="알림" width={30} height={30} />
        {hasNewNotification && (
          <span className="absolute top-[-2px] right-[-2px] w-[8px] h-[8px] bg-red-500 rounded-full" />
        )}
      </button>

      {isAlarmOpen && (
        <NotificationPopover onClose={handleClose}>
          <NotificationList />
        </NotificationPopover>
      )}
    </div>
  );
}
