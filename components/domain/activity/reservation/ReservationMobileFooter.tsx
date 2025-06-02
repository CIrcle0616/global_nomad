'use client';

import CommonButton from '@/components/common/CommonButton';

interface ReservationMobileFooterProps {
  state: {
    date: Date | undefined;
    time: string;
    count: number;
  };
  pricePerPerson: number;
  onClickDateSelect: () => void;
  onClickReserve: () => void;
  loading?: boolean;
}

export default function ReservationMobileFooter({
  state,
  pricePerPerson,
  onClickDateSelect,
  onClickReserve,
  loading = false,
}: ReservationMobileFooterProps) {
  const isComplete = !!state.date && state.time && state.count > 0;
  const totalPrice = pricePerPerson * state.count;

  const formattedDateTime = state.date
    ? `${state.date.getFullYear().toString().slice(2)}/${String(state.date.getMonth() + 1).padStart(2, '0')}/${String(state.date.getDate()).padStart(2, '0')} ${state.time} ~ ${String((parseInt(state.time) + 1) % 24).padStart(2, '0')}:${state.time.split(':')[1]}`
    : '';
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl-bold text-black">₩ {totalPrice.toLocaleString()}</span>
            <span className="text-lg-regular text-gray-900">/ 총 {state.count}인</span>
          </div>
          {isComplete && <p className="text-sm text-primary-300 font-semibold">{formattedDateTime}</p>}
          {!isComplete && (
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
