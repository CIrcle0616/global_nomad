'use client';

import { useState, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

import ReservationCard from '@/components/domain/reservation/ReservationCard';
import SkeletonCard from '@/components/skeleton/SkeletonCard';
import EmptyState from '@/components/empty/EmptyState';
import DropdownMenu from '@/components/common/DropDown';
import ComponentSpinner from '@/components/common/spinners/ComponentSpinner';

import { filterOptions } from '@/constants/filterOption';
import { getMyReservations } from '@/services/myReservations';
import useObserver from '@/hooks/useObserver';
import ScrollToTopButton from '@/components/common/ScrollTopButton';

import { wait } from '@/constants/utils/wait';

const PAGE_SIZE = 10;

export default function ClientReservations() {
  const [status, setStatus] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const selectedLabel = filterOptions.find(option => option.value === status)?.label || '전체';

  const handleSelectStatus = (label: string) => {
    const selectedOption = filterOptions.find(option => option.label === label);
    setStatus(selectedOption ? selectedOption.value : '');
    setIsInitialLoad(false);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['myReservations', status],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const [result] = await Promise.all([
        getMyReservations({
          cursorId: pageParam,
          size: PAGE_SIZE,
          status,
        }),
        wait(400),
      ]);
      return result;
    },
    getNextPageParam: lastPage => {
      const reservations = lastPage?.reservations ?? [];
      return reservations.length < PAGE_SIZE ? undefined : reservations[reservations.length - 1].id;
    },
    initialPageParam: undefined,
  });

  const observerRef = useRef<HTMLDivElement>(null);

  useObserver(observerRef, {
    hasNextPage,
    isLoading,
    onIntersect: () => fetchNextPage(),
  });

  const allReservations = data?.pages.flatMap(page => page.reservations ?? []) ?? [];

  const renderContent = () => {
    if (isLoading) {
      if (isInitialLoad) {
        return (
          <div className="flex flex-col gap-6 mb-40">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        );
      }

      return (
        <div className="flex justify-center py-8">
          <ComponentSpinner message="데이터를 불러오는 중입니다..." />
        </div>
      );
    }

    if (isError) {
      return <div className="text-red-500 text-lg mt-4">예약 내역을 불러오는 데 실패했습니다.</div>;
    }

    if (allReservations.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="flex flex-col gap-6 mb-40">
        {allReservations.map(reservation => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
        {hasNextPage && (
          <div
            ref={observerRef}
            style={{
              height: '1px',
              marginTop: '40px',
              background: 'transparent',
            }}
          />
        )}
        {!isLoading && isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <ComponentSpinner message="추가 데이터를 불러오는 중입니다..." />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-[792px] ml-6 py-8">
      <div className="flex items-center justify-between mb-4 max-w-full md:max-w-[600px] lg:max-w-[792px]">
        <h1 className="text-xl-bold md:text-2xl-bold lg:text-3xl-bold mb-2">예약 내역</h1>
        <DropdownMenu
          options={filterOptions.map(option => option.label)}
          onSelect={handleSelectStatus}
          trigger={
            <button className="w-[140px] md:w-[158px] lg:w-[158px] h-[53px] rounded-[15px] border border-green-500 bg-white flex items-center justify-between px-3 md:px-4 mb-2">
              <span className="text-green-500 text-lg-bold md:text-lg-bold lg:text-2lg-bold">{selectedLabel}</span>
              <Image src="/ic_vector.svg" alt="드롭다운 아이콘" width={16} height={16} />
            </button>
          }
        >
          {option => (
            <span className="flex justify-center items-center w-full text-center !text-[14px] md:!text-lg-medium mb-2 last:mb-0">
              {option}
            </span>
          )}
        </DropdownMenu>
      </div>
      {renderContent()}
      <ScrollToTopButton />
    </div>
  );
}
