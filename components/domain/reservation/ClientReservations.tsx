'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

import ReservationCard from '@/components/domain/reservation/ReservationCard';
import SkeletonCard from '@/components/skeleton/SkeletonCard';
import EmptyState from '@/components/empty/EmptyState';
import DropdownMenu from '@/components/common/DropDown';

import { filterOptions } from '@/constants/filterOption';
import { getMyReservations } from '@/services/myReservations';
import { Reservation } from '@/types/domain/myReservations/types';

const PAGE_SIZE = 10;
const INITIAL_RENDER_COUNT = 5;

export default function ClientReservations() {
  const [status, setStatus] = useState<string>('');

  const selectedLabel = useMemo(() => {
    return filterOptions.find(option => option.value === status)?.label || '전체';
  }, [status]);

  const handleSelectStatus = (label: string) => {
    const selectedOption = filterOptions.find(option => option.label === label);
    const statusValue = selectedOption ? selectedOption.value : '';
    setStatus(statusValue);
  };

  // 커서 기반 무한 스크롤 예약 데이터 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['myReservations', status],
    queryFn: ({ pageParam }: { pageParam?: number }) => getMyReservations(pageParam, PAGE_SIZE, status),
    getNextPageParam: lastPage => {
      const reservations = lastPage?.reservations ?? [];
      if (!reservations.length) return undefined;
      return lastPage.cursorId ?? reservations[reservations.length - 1].id;
    },
    initialPageParam: undefined,
  });

  // 모든 예약 데이터를 한 배열로 합치기
  const allReservations: Reservation[] = Array.isArray(data?.pages)
    ? data.pages.flatMap(page => page.reservations ?? [])
    : [];

  const [renderCount, setRenderCount] = useState(INITIAL_RENDER_COUNT);

  // IntersectionObserver로 스크롤 감지
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (renderCount < allReservations.length) {
            setRenderCount(prev => Math.min(prev + INITIAL_RENDER_COUNT, allReservations.length));
          } else if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }
      },
      { rootMargin: '100px' },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, renderCount, allReservations.length]);

  useEffect(() => {
    setRenderCount(INITIAL_RENDER_COUNT);
  }, [status, data]);

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
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-red-500 text-lg mt-4">예약 내역을 불러오는 데 실패했습니다.</div>
      ) : allReservations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6 mb-40">
          {allReservations.slice(0, renderCount).map(reservation => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}

          <div ref={observerRef} style={{ height: 1 }} />
          {isFetchingNextPage && <div>로딩 중...</div>}
        </div>
      )}
    </div>
  );
}
