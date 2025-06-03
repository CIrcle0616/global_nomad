'use client';

import { useQuery } from '@tanstack/react-query';
import ReservationCard from '@/components/common/ReservationCard';
import SkeletonCard from '@/components/skeleton/SkeletonCard';
import EmptyState from '@/components/empty/EmptyState';
import DropdownMenu from '@/components/common/DropDown';
import Image from 'next/image';

import { filterOptions } from '@/constants/filterOption';
import { getMyReservations } from '@/services/myReservations';
import { useState, useMemo } from 'react';

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myReservations', status],
    queryFn: () => getMyReservations(undefined, undefined, status),
  });

  const filteredReservations = useMemo(() => {
    const reservations = data?.reservations || [];
    return [...reservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [data]);

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
      ) : isError ? (
        <div className="text-red-500 mt-4">예약 내역을 불러오는 데 실패했습니다.</div>
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
