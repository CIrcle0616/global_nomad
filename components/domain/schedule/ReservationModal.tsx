'use client';

import CommonButton from '@/components/common/CommonButton';
import DropdownSelect from '@/components/common/DropDownSelect';
import { getMyActivityReservations, getMyReservedSchedule, patchMyActivityReservations } from '@/services/myActivities';
import { useModalStore } from '@/store/modalStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';

type TabStatus = 'PENDING' | 'REJECTED' | 'APPROVED';

interface ScheduleOption {
  id: number;
  startTime: string;
  endTime: string;
}

interface ReservationModalProps {
  activityId: number;
  date: string;
  status: '예약' | '승인' | '거절';
}

export default function ReservationModal({ activityId, date }: ReservationModalProps) {
  const { closeModal } = useModalStore();
  const [statusTab, setStatusTab] = useState<TabStatus>('PENDING');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedScheduleLabel, setSelectedScheduleLabel] = useState<string>('');

  //해당 날짜 시간대 목록 가져오기
  const { data: scheduleData } = useQuery({
    queryKey: ['reservedSchedule', activityId, date, statusTab],
    queryFn: () => getMyReservedSchedule(activityId, date),
    enabled: !!date,
  });

  //드롭다운 옵션으로 변경
  const ScheduleOptions: ScheduleOption[] = (scheduleData ?? []).map(s => ({
    id: s.scheduleId,
    startTime: s.startTime,
    endTime: s.endTime,
  }));

  //시간 선택 시 예약 내역 불러오기
  const {
    data: reservationData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['activityReservations', activityId, selectedScheduleId, statusTab],
    queryFn: () => getMyActivityReservations(activityId, selectedScheduleId as number, statusTab),
    enabled: !!selectedScheduleId,
  });

  //상태 변경
  const mutation = useMutation({
    mutationFn: ({ reservationId, status }: { reservationId: number; status: 'APPROVED' | 'REJECTED' }) =>
      patchMyActivityReservations(activityId, reservationId, { status }),
    onSuccess: () => {
      refetch();
    },
  });

  //승인 버튼: 승인 후 나머지 자동 거절
  const handleApprove = (targetId: number) => {
    if (!reservationData) return;
    mutation.mutate(
      { reservationId: targetId, status: 'APPROVED' },
      {
        onSuccess: () => {
          const rejectTargets = reservationData.reservations.filter(r => r.id !== targetId);
          rejectTargets.forEach(res => {
            mutation.mutate({ reservationId: res.id, status: 'REJECTED' });
          });
        },
      },
    );
  };

  const handleTabChange = (status: TabStatus) => {
    setStatusTab(status);
    setSelectedScheduleId(null);
    setSelectedScheduleLabel('');
  };

  const handleTimeSelect = (label: string) => {
    const matched = ScheduleOptions.find(s => `${s.startTime}~${s.endTime}` === label);
    if (matched) {
      setSelectedScheduleId(matched.id);
      setSelectedScheduleLabel(label);
    }
  };

  return (
    <div className="p-4 w-[380px] max-h-[80vh] overflow-y-auto bg-white rounded-xl">
      <div className="flex justify-end mb-4">
        <button onClick={closeModal}>
          <Image src={closeIcon} alt="닫기" />
        </button>
      </div>
      <h1 className="text-2xl-bold mb-[20px]">예약 정보</h1>

      {/* 탭 */}
      <div className="flex space-x-4 border-b pb-0 mb-4 font-semibold text-sm">
        {(['PENDING', 'APPROVED', 'REJECTED'] as const).map(tab => (
          <button
            key={tab}
            className={statusTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400'}
            onClick={() => handleTabChange(tab)}
          >
            {tab === 'PENDING' ? '신청' : tab === 'APPROVED' ? '승인' : '거절'}
          </button>
        ))}
      </div>

      <h2 className="text-xl-semibold mb-2">예약 날짜</h2>
      <p>{date}</p>

      {/* 시간 드롭다운  */}
      {ScheduleOptions.length > 0 && (
        <div className="mb-4 w-full">
          <DropdownSelect
            type="list"
            selected={selectedScheduleLabel}
            onSelect={handleTimeSelect}
            placeholder="예약 날짜를 선택해주세요."
            options={ScheduleOptions.map(s => `${s.startTime}~${s.endTime}`)}
          />
        </div>
      )}

      {/* 예약 내역   */}
      <h2 className="text-xl-semibold mb-2">예약 내역</h2>
      {isLoading ? (
        <p>불러오는 중...</p>
      ) : reservationData?.reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        reservationData?.reservations
          .slice()
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map(res => (
            <div key={res.id} className="border rounded-md mb-2 px-4 py-3">
              <p className="mb-1">
                <span className="text-gray-800 text-lg-semibold">닉네임 </span>
                <span className="text-lg-medium"> {res.nickname}</span>
              </p>

              <p className="mb-1">
                <span className="text-gray-800 text-lg-semibold">인원 </span>
                <span className="text-lg-medium"> {res.headCount}명</span>
              </p>

              {statusTab === 'PENDING' && (
                <div className="flex gap-2 justify-end  mt-2">
                  <CommonButton size="S" className="px-3 rounded-md" onClick={() => handleApprove(res.id)}>
                    승인하기
                  </CommonButton>
                  <CommonButton
                    size="S"
                    className=" px-3 rounded-md"
                    variant="secondary"
                    onClick={() => mutation.mutate({ reservationId: res.id, status: 'REJECTED' })}
                  >
                    거절하기
                  </CommonButton>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
}
