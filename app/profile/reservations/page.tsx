'use client';

import EmptyState from '@/components/empty/EmptyState';
import DropdownMenu from '@/components/common/DropDown';
import ReservationCard from '@/components/common/ReservationCard';
import { useState, useMemo, useEffect } from 'react';
import SkeletonCard from '@/components/skeleton/SkeletonCard';
import Image from 'next/image';

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 목업 데이터 (API 연결 시 React Query로 대체 예정)
  const reservationsResponse = {
    cursorId: 0,
    reservations: [
      {
        id: 1,
        teamId: 'team-1',
        userId: 101,
        activity: {
          bannerImageUrl: 'https://picsum.photos/id/1015/200/200',
          title: '해변가에서 서핑 클래스',
          id: 501,
        },
        scheduleId: 201,
        status: 'canceled',
        reviewSubmitted: false,
        totalPrice: 25000,
        headCount: 8,
        date: '2025-06-10',
        startTime: '09:00',
        endTime: '10:30',
        createdAt: '2025-06-10T12:00:00Z',
        updatedAt: '2025-06-10T12:00:00Z',
      },
      {
        id: 2,
        teamId: 'team-1',
        userId: 102,
        activity: {
          bannerImageUrl: 'https://picsum.photos/id/1020/200/200',
          title: '숲속 자연 명상 체험',
          id: 502,
        },
        scheduleId: 202,
        status: 'completed',
        reviewSubmitted: true,
        totalPrice: 30000,
        headCount: 12,
        date: '2025-07-20',
        startTime: '14:00',
        endTime: '16:00',
        createdAt: '2025-07-20T09:00:00Z',
        updatedAt: '2025-07-20T09:00:00Z',
      },
      {
        id: 3,
        teamId: 'team-1',
        userId: 103,
        activity: {
          bannerImageUrl: 'https://picsum.photos/id/1035/200/200',
          title: '폭포 여행',
          id: 503,
        },
        scheduleId: 203,
        status: 'confirmed',
        reviewSubmitted: false,
        totalPrice: 18000,
        headCount: 4,
        date: '2025-08-15',
        startTime: '11:00',
        endTime: '13:00',
        createdAt: '2025-08-15T13:00:00Z',
        updatedAt: '2025-08-15T13:00:00Z',
      },
      {
        id: 4,
        teamId: 'team-1',
        userId: 104,
        activity: {
          bannerImageUrl: 'https://picsum.photos/id/1060/200/200',
          title: '나만의 커피 만들기',
          id: 504,
        },
        scheduleId: 204,
        status: 'pending',
        reviewSubmitted: false,
        totalPrice: 35000,
        headCount: 2,
        date: '2025-09-05',
        startTime: '15:00',
        endTime: '17:00',
        createdAt: '2025-09-05T15:00:00Z',
        updatedAt: '2025-09-05T15:00:00Z',
      },
      {
        id: 5,
        teamId: 'team-1',
        userId: 105,
        activity: {
          bannerImageUrl: 'https://picsum.photos/id/1080/200/200',
          title: '딸기 농사 체험',
          id: 505,
        },
        scheduleId: 205,
        status: 'completed',
        reviewSubmitted: false,
        totalPrice: 50000,
        headCount: 10,
        date: '2025-10-12',
        startTime: '19:00',
        endTime: '22:00',
        createdAt: '2025-10-12T19:00:00Z',
        updatedAt: '2025-10-12T19:00:00Z',
      },
      {
        id: 6,
        teamId: 'team-1',
        userId: 106,
        activity: {
          bannerImageUrl: 'https://picsum.photos/id/1058/200/200',
          title: '축구 경기 대회 관람',
          id: 506,
        },
        scheduleId: 206,
        status: 'declined',
        reviewSubmitted: false,
        totalPrice: 20000,
        headCount: 6,
        date: '2025-11-03',
        startTime: '10:00',
        endTime: '12:00',
        createdAt: '2025-11-03T10:00:00Z',
        updatedAt: '2025-11-03T10:00:00Z',
      },
    ],
    totalCount: 6,
  };

  const reservations = reservationsResponse.reservations;

  const filterOptions = [
    { value: '', label: '전체' },
    { value: 'pending', label: '예약 신청' },
    { value: 'canceled', label: '예약 취소' },
    { value: 'confirmed', label: '예약 승인' },
    { value: 'declined', label: '예약 거절' },
    { value: 'completed', label: '체험 완료' },
  ];

  useEffect(() => {
    const savedStatus = localStorage.getItem('selectedStatus');
    if (savedStatus) {
      setSelectedStatus(savedStatus);
    }
  }, []);

  // 드롭다운에서 선택 시 LocalStorage에도 저장
  const handleSelectStatus = (label: string) => {
    const selectedOption = filterOptions.find(option => option.label === label);
    const statusValue = selectedOption ? selectedOption.value : '';
    setSelectedStatus(statusValue);
    localStorage.setItem('selectedStatus', statusValue);
  };

  const selectedLabel = useMemo(() => {
    return filterOptions.find(option => option.value === selectedStatus)?.label || '전체';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const filteredReservations = useMemo(() => {
    const targetReservations =
      selectedStatus === '' ? reservations : reservations.filter(reservation => reservation.status === selectedStatus);

    return [...targetReservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [selectedStatus, reservations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // 0.3초

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-6 ml-4">
      <div className="flex items-center justify-between mb-4 max-w-full md:max-w-[600px] lg:max-w-[792px]">
        <h1 className="text-3xl-bold">예약 내역</h1>
        <DropdownMenu
          options={filterOptions.map(option => option.label)}
          onSelect={handleSelectStatus}
          trigger={
            <button className="w-[158px] h-[53px] rounded-[15px] border border-green-500 bg-white flex items-center justify-between px-4">
              <span className="text-green-500 text-2lg-medium">{selectedLabel}</span>
              <Image src="/ic_vector.svg" alt="드롭다운 아이콘" width={16} height={16} />
            </button>
          }
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-6 mb-40">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredReservations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6 mb-40">
          {filteredReservations.map(reservation => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      )}
    </div>
  );
}
