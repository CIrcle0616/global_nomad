'use client';

import useUserStore from '@/store/useUserStore';
import { useState } from 'react';
import NotificationPopover from './NotificationPopover';
import NotificationList from './NotificationList';
import Image from 'next/image';
import alarmIcon from '@/public/ic_alarm.svg';

export default function AlarmButton() {
  const { user } = useUserStore();
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="inline-block relative">
      <button
        onClick={() => setIsAlarmOpen(prev => !prev)}
        className="mx-2 transition ease-in-out hover:font-bold hover:scale-105"
      >
        <Image src={alarmIcon} alt="알림" width={1} height={1} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
      </button>

      {isAlarmOpen && (
        <NotificationPopover onClose={() => setIsAlarmOpen(false)}>
          <NotificationList />
        </NotificationPopover>
      )}
    </div>
  );
}
