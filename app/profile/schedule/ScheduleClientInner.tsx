'use client';

import ScheduleName from '@/components/domain/schedule/ScheduleName';
import { useState } from 'react';
import MyReservationCalendar from './calendar/MyReservationCalendar';

interface Schedule {
  id: number;
  title: string;
}

interface ScheduleClientInnerProps {
  activityList: Schedule[];
}

export default function ScheduleClientInner({ activityList }: ScheduleClientInnerProps) {
  const [selectedId, setSelectedId] = useState(activityList[0].id);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl-bold mb-6 ml-4">예약 현황</h1>
      <ScheduleName activityList={activityList} selectedId={selectedId} onSelectedId={setSelectedId} />
      <MyReservationCalendar activityId={selectedId} />
    </div>
  );
}
