'use client';

import CommonButton from '@/components/common/CommonButton';
import { formatSelectedDateTime } from '@/lib/format';

interface ReservationMobileFooterProps {
  state: {
    date: Date | undefined;
    time: string;
    count: number;
  };
  pricePerPerson: number;
  availableTimes: { startTime: string; endTime: string }[];
  onClickDateSelect: () => void;
  onClickReserve: () => void;
  loading?: boolean;
}

export default function ReservationMobileFooter({
  state,
  pricePerPerson,
  onClickDateSelect,
  onClickReserve,
  availableTimes,
  loading = false,
}: ReservationMobileFooterProps) {
  const isComplete = !!state.date && state.time && state.count > 0;
  const totalPrice = pricePerPerson * state.count;

  const formattedDateTime = state.date ? formatSelectedDateTime(state.date, state.time, availableTimes) : '';
  return (
    <div className="p-4 py-[28px]">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl-bold text-black">₩ {totalPrice.toLocaleString()}</span>
            <span className="text-lg-regular text-gray-900">/ 총 {state.count}인</span>
          </div>
          {isComplete ? (
            <button
              onClick={onClickDateSelect}
              className="underline text-sm text-black hover:text-black cursor-pointer"
            >
              {formattedDateTime}
            </button>
          ) : (
            <button
              className="underline text-sm text-gray-800 hover:text-black cursor-pointer"
              onClick={onClickDateSelect}
            >
              날짜를 선택해주세요
            </button>
          )}
        </div>

        <CommonButton
          size="S"
          disabled={!isComplete || loading}
          onClick={onClickReserve}
          className="rounded-md px-4 text-md-bold"
        >
          예약하기
        </CommonButton>
      </div>
    </div>
  );
}
