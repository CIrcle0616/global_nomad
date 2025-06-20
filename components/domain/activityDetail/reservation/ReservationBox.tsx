//상태/핸들러/로직
'use client';

import useMediaQuery from '@/store/useMediaQuery';
import ReservationMobile from './ReservationMobile';
import ReservationMobileFooter from './ReservationMobileFooter';
import ReservationTablet from './ReservationTablet';
import ReservationPC from './ReservationPC';
import { useState } from 'react';

interface ReservationState {
  date: Date | undefined;
  time: string;
  count: number;
}

interface ReservationBoxProps {
  state: ReservationState;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onCountChange: (count: number) => void;
  onReserve: () => void;
  pricePerPerson: number;
  availableTimes: { startTime: string; endTime: string }[];
  availableDates: string[];
  loading?: boolean;
  scheduleData?: {
    date: string;
    times: { startTime: string; endTime: string; id: number }[];
  }[];
}

export default function ReservationBox({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  pricePerPerson,
  availableTimes,
  availableDates,
  scheduleData,
  loading = false,
}: ReservationBoxProps) {
  const device = useMediaQuery();
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  if (device === 'mobile') {
    return (
      <>
        {isMobileFormOpen && (
          <ReservationMobile
            state={state}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
            onCountChange={onCountChange}
            onReserve={onReserve}
            availableTimes={availableTimes}
            availableDates={availableDates}
            loading={loading}
            onClose={() => setIsMobileFormOpen(false)}
          />
        )}
        {!isMobileFormOpen && (
          <ReservationMobileFooter
            state={state}
            pricePerPerson={pricePerPerson}
            availableTimes={availableTimes}
            onClickDateSelect={() => setIsMobileFormOpen(true)}
            onClickReserve={onReserve}
            loading={loading}
          />
        )}
      </>
    );
  }

  if (device === 'tablet') {
    return (
      <ReservationTablet
        state={state}
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
        onCountChange={onCountChange}
        onReserve={onReserve}
        pricePerPerson={pricePerPerson}
        availableTimes={availableTimes}
        availableDates={availableDates}
        loading={loading}
        scheduleData={scheduleData}
      />
    );
  }

  return (
    <ReservationPC
      state={state}
      onDateChange={onDateChange}
      onCountChange={onCountChange}
      onTimeChange={onTimeChange}
      onReserve={onReserve}
      pricePerPerson={pricePerPerson}
      availableDates={availableDates}
      availableTimes={availableTimes}
      loading={loading}
    />
  );
}
