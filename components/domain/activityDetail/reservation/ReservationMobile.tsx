//모바일 전용 배치

import { useEffect, useState } from 'react';
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
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white flex flex-col p-4 z-[999] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2lg-bold">
          {step === 1 && '날짜'}
          {step === 2 && '인원'}
        </h2>
        <button onClick={onClose} aria-label="닫기" className="mb-6">
          <Image src={closeIcon} alt="닫기" className="w-[20px] h-[20px]" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden px-4">
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

      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white z-[999]">
        <CommonButton
          size="M"
          className="w-full rounded-md"
          onClick={goNext}
          disabled={loading || (step === 1 && (!state.date || !state.time)) || (step === 2 && !isReservable)}
        >
          {step < 2 ? '다음' : '확인'}
        </CommonButton>
      </div>
    </div>
  );
}
