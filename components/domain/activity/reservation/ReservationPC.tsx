//PC 전용 배치

import CommonButton from '@/components/common/CommonButton';
import DateSelector from './parts/DateSelector';
import ParticipantSelector from './parts/ParticipantSelector';
import TimeSelector from './parts/TimeSelector';
import PriceTotal from './parts/PriceTotal';

interface ReservationPCProps {
  state: {
    date: Date | undefined;
    time: string;
    count: number;
  };

  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onCountChange: (count: number) => void;
  onReserve: () => void;
  pricePerPerson: number;
  availableTimes: { startTime: string; endTime: string }[];
  loading?: boolean;
}

export default function ReservationPC({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  pricePerPerson,
  loading = false,
  availableTimes,
}: ReservationPCProps) {
  const isReservable = !!state.date && state.time;

  const handleConfirm = () => {
    if (state.date && state.time) {
      onReserve();
    }
  };

  return (
    <div className="rounded-xl border p-4 shadow bg-white w-[384px]">
      <div className="flex items-end gap-2 mb-3">
        <span className="text-2xl-bold text-black">₩ {pricePerPerson.toLocaleString()}</span>
        <span className="text-lg-regular text-gray-900">/인</span>
      </div>
      <div className="border border-gray-300 mb-4" />

      <div className="mb-6">
        <span className="block text-black mb-3 text-2lg-bold">날짜</span>
        <DateSelector date={state.date} onSelect={onDateChange} />
      </div>

      {state.date && (
        <div className="mb-6">
          <span className="block text-black mb-2 text-2lg-bold">예약 가능한 시간</span>
          {availableTimes.length > 0 ? (
            <TimeSelector times={availableTimes} selected={state.time} onChange={onTimeChange} disabled={loading} />
          ) : (
            <p className="text-sm text-gray-500">예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      )}
      <div className="border border-gray-300 mb-4" />

      <div className="mb-3">
        <span className="block text-black mb-1 text-2lg-bold">참여 인원 수</span>
        <ParticipantSelector count={state.count} setCount={onCountChange} />
      </div>
      <CommonButton
        size="L"
        className="w-full mb-3 mt-5 rounded-md"
        disabled={!isReservable || loading}
        onClick={handleConfirm}
      >
        예약하기
      </CommonButton>
      <div className="border border-gray-300 mb-4" />

      <div className="text-xl-bold">
        <PriceTotal price={pricePerPerson} count={state.count} />
      </div>
    </div>
  );
}
