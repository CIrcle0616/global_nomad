'use client';

import CommonButton from '@/components/common/CommonButton';
import DropdownSelect from '@/components/common/DropDownSelect';
import { getMyActivityReservations, getMyReservedSchedule, patchMyActivityReservations } from '@/services/myActivities';
import { useModalStore } from '@/store/modalStore';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';
import { format } from 'date-fns';
import { useReservationStore } from '@/store/useReservationStore';
import { useScheduleOptions } from '@/hooks/useScheduleOptions';
import { useReservationCount } from '@/hooks/useReservationCount';
import { useAvailableSchedules } from '@/hooks/useAvailableSchedules';

type TabStatus = 'pending' | 'confirmed' | 'declined';

interface ReservationModalProps {
  activityId: number;
  date: string;
}

const STATUS_LABELS: Record<TabStatus, string> = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
};

export default function ReservationModal({ activityId, date }: ReservationModalProps) {
  const { closeModal } = useModalStore();
  const { statusTab, setStatusTab } = useReservationStore();
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedScheduleLabel, setSelectedScheduleLabel] = useState<string>('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  //해당 날짜 시간대 목록 가져오기
  const { data: scheduleData } = useQuery({
    queryKey: ['reservedSchedule', activityId, date],
    queryFn: () => getMyReservedSchedule({ activityId, date }),
    enabled: !!activityId && !!date,
  });

  //드롭다운 옵션으로 변경
  const ScheduleOptions = useScheduleOptions(scheduleData);
  const { data: pendingCount = 0 } = useReservationCount(activityId, date, scheduleData, 'pending');
  const { data: confirmedCount = 0 } = useReservationCount(activityId, date, scheduleData, 'confirmed');
  const { data: declinedCount = 0 } = useReservationCount(activityId, date, scheduleData, 'declined');

  //예약이 존재하는 스케줄만
  const { data: availableScheduleOptions = [], isLoading: isAvailableSchedulesLoading } = useAvailableSchedules(
    activityId,
    date,
    scheduleData,
    statusTab,
  );

  //예약이 있는 첫 스케줄 자동 선택
  useEffect(() => {
    if (selectedScheduleId || isAvailableSchedulesLoading) return;
    if (availableScheduleOptions.length > 0) {
      const first = availableScheduleOptions[0];
      setSelectedScheduleId(first.scheduleId);
      setSelectedScheduleLabel(`${first.startTime}~${first.endTime}`);
    }
  }, [availableScheduleOptions, isAvailableSchedulesLoading, selectedScheduleId, statusTab]);

  //시간 선택 시 예약 내역 불러오기
  const {
    data: reservationPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['activityReservations', activityId, selectedScheduleId, statusTab],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getMyActivityReservations({
        activityId,
        scheduleId: selectedScheduleId!,
        status: statusTab,
        cursorId: pageParam ?? undefined,
        size: 10,
      }),
    getNextPageParam: lastPage => (lastPage.reservations.length < 10 ? undefined : lastPage.cursorId),
    initialPageParam: undefined,
    enabled: !!selectedScheduleId,
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  //상태 변경
  const mutation = useMutation({
    mutationFn: ({ reservationId, status }: { reservationId: number; status: 'confirmed' | 'declined' }) =>
      patchMyActivityReservations({ activityId, reservationId, body: { status } }),
    onSuccess: () => {
      ['pending', 'confirmed', 'declined'].forEach(s => {
        queryClient.invalidateQueries({
          queryKey: ['activityReservations', activityId, selectedScheduleId, s],
        });
      });

      ['pending', 'confirmed', 'declined'].forEach(s => {
        queryClient.invalidateQueries({
          queryKey: ['reservationCount', activityId, date, s],
        });
      });

      const today = new Date();
      const year = format(today, 'yyyy');
      const month = format(today, 'MM');
      queryClient.invalidateQueries({
        queryKey: ['reservationBoard', activityId, year, month],
      });
    },
  });

  //승인 버튼: 승인 후 나머지 자동 거절
  const handleApprove = async (targetId: number) => {
    const all = reservationPages?.pages.flatMap(p => p.reservations) ?? [];

    //승인
    await mutation.mutateAsync({ reservationId: targetId, status: 'confirmed' });

    //나머지 거절
    await Promise.all(
      all
        .filter(r => r.id !== targetId)
        .map(res => mutation.mutateAsync({ reservationId: res.id, status: 'declined' })),
    );

    //탭 변경
    setStatusTab('confirmed');
  };

  const handleDecline = async (targetId: number) => {
    //거절
    await mutation.mutateAsync({ reservationId: targetId, status: 'declined' });

    setStatusTab('declined');
  };

  const handleTabChange = (status: TabStatus) => {
    setStatusTab(status);
  };

  const handleTimeSelect = (label: string) => {
    const matched = ScheduleOptions.find(s => `${s.startTime}~${s.endTime}` === label);
    if (matched) {
      setSelectedScheduleId(matched.id);
      setSelectedScheduleLabel(label);
    }
  };

  const allReservations = reservationPages?.pages.flatMap(p => p.reservations) ?? [];
  const currentReservations = allReservations
    .filter(r => r.status === statusTab)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-5 w-[380px] max-h-[80vh] min-h-[500px] overflow-y-auto bg-white rounded-xl">
      <div className="flex justify-between mb-4 items-center mb-[20px]">
        <h1 className="text-2xl-bold">예약 정보</h1>
        <button onClick={closeModal}>
          <Image src={closeIcon} alt="닫기" width={25} height={25} />
        </button>
      </div>

      {/* 탭 */}
      <div className="flex space-x-4 border-b pb-0 mb-5 font-semibold text-sm">
        {(Object.keys(STATUS_LABELS) as TabStatus[]).map(tab => (
          <button
            key={tab}
            className={statusTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400'}
            onClick={() => handleTabChange(tab)}
          >
            {STATUS_LABELS[tab]}{' '}
            <span>{tab === 'pending' ? pendingCount : tab === 'confirmed' ? confirmedCount : declinedCount}</span>
          </button>
        ))}
      </div>

      <h2 className="text-xl-semibold mb-3">예약 날짜</h2>
      <p className="text-sm-medium ml-1 text-gray-900">{date}</p>

      {/* 시간 드롭다운  */}
      <div className={`mb-6 mt-1 w-full ${ScheduleOptions.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
        <DropdownSelect
          type="list"
          selected={selectedScheduleLabel}
          onSelect={handleTimeSelect}
          placeholder={ScheduleOptions.length === 0 ? '예약 가능한 시간이 없습니다.' : '예약 시간을 선택해주세요.'}
          options={ScheduleOptions.map(s => `${s.startTime}~${s.endTime}`)}
        />
      </div>

      {/* 예약 내역   */}
      <h2 className="text-xl-semibold mb-2">예약 내역</h2>
      {currentReservations.length === 0 ? (
        <p className="text-gray-400 text-center py-4">예약 내역이 없습니다.</p>
      ) : (
        <>
          {currentReservations.map(res => (
            <div key={res.id} className="border rounded-md mb-2 px-4 py-3">
              <p className="mb-1">
                <span className="text-gray-800 text-lg-semibold">닉네임 </span>
                <span className="text-lg-medium"> {res.nickname}</span>
              </p>

              <p className="mb-1">
                <span className="text-gray-800 text-lg-semibold">인원 </span>
                <span className="text-lg-medium"> {res.headCount}명</span>
              </p>

              {statusTab === 'pending' ? (
                <div className="flex gap-2 justify-end  mt-2">
                  <CommonButton size="S" className="px-3 rounded-md" onClick={() => handleApprove(res.id)}>
                    승인하기
                  </CommonButton>
                  <CommonButton
                    size="S"
                    className=" px-3 rounded-md"
                    variant="secondary"
                    onClick={() => handleDecline(res.id)}
                  >
                    거절하기
                  </CommonButton>
                </div>
              ) : (
                <div className="flex justify-end mt-2">
                  <span
                    className={`px-3 py-[2px] text-sm rounded-full ${
                      statusTab === 'confirmed' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {statusTab === 'confirmed' ? '예약 승인' : '예약 거절'}
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={loadMoreRef} className="h-6" />
        </>
      )}
    </div>
  );
}
