'use client';

import ScheduleName from '@/components/domain/schedule/ScheduleName';
import { getMyActivities } from '@/services/myActivities';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import MyReservationCalendar from './calendar/MyReservationCalendar';
import EmptyState from '@/components/empty/EmptyState';

export default function ScheduleClientInner() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getMyActivities({}),
  });

  const activityList = useMemo(() => activities?.activities ?? [], [activities]);
  useEffect(() => {
    if (activityList.length > 0 && selectedId === null) {
      setSelectedId(activityList[0].id);
    }
  }, [activityList, selectedId]);

  return (
    <div className="mb-6 ml-4">
      <div className="flex items-center justify-between mb-4 max-w-full md:max-w-[600px] lg:max-w-[792px]">
        <h1 className="text-3xl-bold">예약 현황</h1>
      </div>

      {isLoading ? (
        <div>불러오는 중...</div>
      ) : activityList.length === 0 ? (
        <EmptyState />
      ) : selectedId !== null ? (
        <>
          <ScheduleName activityList={activityList} selectedId={selectedId} onSelectedId={setSelectedId} />
          <MyReservationCalendar activityId={selectedId} />
        </>
      ) : null}
    </div>
  );
}
