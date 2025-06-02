//상태/핸들러/로직
'use client';

import useMediaQuery from '@/store/useMediaQuery';
import ReservationMobile from './ReservationMobile';
import ReservationMobileFooter from './ReservationMobileFooter';
import ReservationTablet from './ReservationTablet';
import ReservationPC from './ReservationPC';

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
  onClickDateSelect?: () => void;
  pricePerPerson: number;
  availableTimes: string[];
  loading?: boolean;
}

export default function ReservationBox({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  onClickDateSelect,
  pricePerPerson,
  availableTimes,
  loading = false,
}: ReservationBoxProps) {
  const device = useMediaQuery();

  if (device === 'mobile') {
    return (
      <>
        <ReservationMobile
          state={state}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
          onCountChange={onCountChange}
          onReserve={onReserve}
          availableTimes={availableTimes}
          loading={loading}
        />
        <ReservationMobileFooter
          state={state}
          pricePerPerson={pricePerPerson}
          onClickDateSelect={onClickDateSelect ?? (() => {})}
          onClickReserve={onReserve}
          loading={loading}
        />
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
        loading={loading}
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
      availableTimes={availableTimes}
      loading={loading}
    />
  );
}
