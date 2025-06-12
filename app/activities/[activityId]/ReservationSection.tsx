'use client';

import OneButtonModal from '@/components/common/modal/OneButtonModal';
import ReservationBox from '@/components/domain/activityDetail/reservation/ReservationBox';
import { getActivitiesId, getAvailableSchedule, postActivityReservation } from '@/services/activities';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/store/modalStore';

export default function ReservationSection() {
  const { activityId } = useParams();
  const id = Number(activityId);

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [count, setCount] = useState(1);
  const { openModal, closeModal } = useModalStore();

  //체험 상세 정보 불러오기 -> 가격 포함
  const { data: activityData } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivitiesId(id),
    enabled: !!id,
  });

  //날짜 바뀌었을 때 해당 날짜의 예약 시간 불러오기

  const year = date ? format(date, 'yyyy') : '';
  const month = date ? format(date, 'MM') : '';
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  const { data: scheduleData } = useQuery({
    queryKey: ['availableSchedule', id, year, month],
    queryFn: () => getAvailableSchedule({ activityId: id, year, month }),
    enabled: !!id && !!date,
  });

  const matchedDay = scheduleData?.find(d => d.date === formattedDate);
  console.log('matchedDay:', matchedDay);

  const availableTimes = matchedDay?.times.map(t => ({ startTime: t.startTime, endTime: t.endTime })) ?? [];
  console.log('예약 가능한 시간:', availableTimes);

  //예약 요청
  const handleReserve = async () => {
    if (!date || !time || count <= 0) return;

    try {
      const matchedSchedule = matchedDay?.times.find(t => t.startTime === time);
      console.log('matchedSchedule:', matchedSchedule);

      if (!matchedSchedule) throw new Error('해당 시간에 예약 가능한 스케줄이 없습니다');

      await postActivityReservation({
        activityId: id,
        body: {
          scheduleId: matchedSchedule.id,
          headCount: count,
        },
      });
      openModal(OneButtonModal, {
        content: '예약이 완료되었습니다.',
        buttonText: '확인',
        onConfirm: () => closeModal(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const pricePerPerson = activityData?.price;
  if (pricePerPerson === undefined) {
    return <p className="text-center py-10">가격 정보를 불러오는 중입니다...</p>;
  }

  return (
    <ReservationBox
      state={{ date, time, count }}
      onDateChange={setDate}
      onTimeChange={setTime}
      onCountChange={setCount}
      onReserve={handleReserve}
      pricePerPerson={pricePerPerson}
      availableTimes={availableTimes}
    />
  );
}
