//모바일 전용 배치

import { useState } from 'react';
import DateSelector from './parts/DateSelector';
import ParticipantSelector from './parts/ParticipantSelector';
import TimeSelector from './parts/TimeSelector';
import CommonButton from '@/components/common/CommonButton';
import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';

interface ReservationMobileProps {
  state: {
    date: Date | undefined;
    time: string;
    count: number;
  };
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onCountChange: (count: number) => void;
  onReserve: () => void;
  onClose: () => void;
  availableTimes: { startTime: string; endTime: string }[];
  loading?: boolean;
}

export default function ReservationMobile({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  onClose,
  availableTimes,
  loading = false,
}: ReservationMobileProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const isReservable = !!state.date && !!state.time;

  const goNext = () => {
    if (step < 2) {
      setStep(prev => (prev + 1) as 1 | 2);
    } else {
      onReserve();
      onClose();
    }
  };

  return (
    <div className="px-4">
      <div className="flex justify-between">
        <h2 className="text-2lg-bold mb-6">
          {step === 1 && '날짜'}
          {step === 2 && '인원'}
        </h2>
        <button onClick={onClose} aria-label="닫기" className="mb-6">
          <Image src={closeIcon} alt="닫기" className="w-[20px] h-[20px]" />
        </button>
      </div>

      <div className="mb-10">
        {step === 1 && (
          <>
            <DateSelector date={state.date} onSelect={onDateChange} />

            {state.date && (
              <div className="mt-6">
                <span className="block text-black mb-2 text-2lg-bold">예약 가능한 시간</span>
                {availableTimes.length > 0 ? (
                  <TimeSelector
                    times={availableTimes}
                    selected={state.time}
                    onChange={onTimeChange}
                    disabled={loading}
                  />
                ) : (
                  <p className="text-sm text-gray-500">예약 가능한 시간이 없습니다.</p>
                )}
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <ParticipantSelector count={state.count} setCount={onCountChange} />
          </>
        )}
      </div>

      <CommonButton
        size="M"
        className="w-full rounded-md"
        onClick={goNext}
        disabled={loading || (step === 1 && (!state.date || !state.time)) || (step === 2 && !isReservable)}
      >
        {step < 2 ? '다음' : '확인'}
      </CommonButton>
    </div>
  );
}
