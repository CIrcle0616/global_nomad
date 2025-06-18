//클라이언트 컴포넌트

'use client';

import Calendar from '@/components/domain/schedule/Calendar';
import ReservationModal from '@/components/domain/schedule/ReservationModal';
import { getMyReservationBoard } from '@/services/myActivities';
import { useModalStore } from '@/store/modalStore';
import { useReservationStore } from '@/store/useReservationStore';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

interface ScheduleItem {
  date: string;
  status: '예약' | '승인' | '완료';
  count: number;
}

export default function MyReservationCalendar({ activityId }: { activityId: number }) {
  const { openModal } = useModalStore();
  const { setStatusTab } = useReservationStore();

  const today = new Date();
  const year = format(today, 'yyyy');
  const month = format(today, 'MM');

  const { data, isLoading, error } = useQuery({
    queryKey: ['reservationBoard', activityId, year, month],
    queryFn: () => getMyReservationBoard({ activityId, year, month }),
    enabled: !!activityId,
  });

  const now = new Date();

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>에러 발생</div>;

  //api를 calendar 형태에 맞게 변환
  const scheduleData: ScheduleItem[] = (data ?? []).flatMap(item => {
    const endTime = new Date(`${item.date}T23:59:59`); //하루 지났는지 판단
    const isPast = endTime < now;
    const completedCount = isPast ? item.reservations.confirmed : item.reservations.completed;

    return [
      { date: item.date, status: '예약', count: item.reservations.pending },
      { date: item.date, status: '승인', count: item.reservations.confirmed },
      { date: item.date, status: '완료', count: completedCount },
    ];
  });

  return (
    <Calendar
      schedule={scheduleData}
      activityId={activityId}
      onClickItem={(date, status) => {
        const tabMap = {
          예약: 'pending',
          승인: 'confirmed',
          완료: 'pending',
        } as const;

        setStatusTab(tabMap[status]);

        openModal(ReservationModal, {
          activityId,
          date,
        });
      }}
    />
  );
}
