//테블릿 버전 배치

import CommonButton from '@/components/common/CommonButton';
import ParticipantSelector from './parts/ParticipantSelector';
import PriceTotal from './parts/PriceTotal';
import { useTabletModalStore } from '@/store/useReservationTabletStore';
import TabletDateTimeModal from './parts/TabletDateTimeModal';
import clsx from 'clsx';

interface ReservationTabletProps {
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
  availableTimes: string[];
  loading?: boolean;
}

export default function ReservationTablet({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  pricePerPerson,
  loading = false,
  availableTimes,
}: ReservationTabletProps) {
  const isReservable = !!state.date && state.time;

  const { isOpen, toggleModal } = useTabletModalStore();

  const handleConfirm = () => {
    if (state.date && state.time) {
      onReserve();
    }
  };

  return (
    <>
      <div className="relative items-start flex">
        <div
          className={clsx(
            'absolute right-full top-[-100px] ease-in-out transition-all mr-5 duration-300',
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0',
          )}
        >
          <TabletDateTimeModal
            state={state}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
            onReserve={onReserve}
            availableTimes={availableTimes}
            loading={loading}
          />
        </div>

        <div className="rounded-xl border p-4 shadow bg-white w-[251px]">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl-bold text-black">₩ {pricePerPerson.toLocaleString()}</span>
            <span className="text-lg-regular text-gray-900">/인</span>
          </div>
          <div className="border border-gray-300 mb-3" />

          <div className="mb-5">
            <span className="block text-black text-xl-bold">날짜</span>

            <div onClick={toggleModal} className="text-black hover:underline cursor-pointer text-sm">
              {state.date && state.time ? (
                formatSelectedDateTime(state.date, state.time)
              ) : (
                <span className="underline text-sm text-gray-800 hover:text-black cursor-pointer">
                  날짜를 선택해주세요
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <span className="block text-black mb-1 text-xl-bold">참여 인원 수</span>
            <ParticipantSelector count={state.count} setCount={onCountChange} />
          </div>

          <CommonButton
            size="M"
            className="w-full mb-3 mt-5 rounded-md"
            disabled={!isReservable || loading}
            onClick={handleConfirm}
          >
            예약하기
          </CommonButton>
          <div className="border border-gray-300 mb-2" />

          <div className="text-xl-bold">
            <PriceTotal price={pricePerPerson} count={state.count} />
          </div>
        </div>
      </div>
    </>
  );
}

function formatSelectedDateTime(date: Date, time: string): string {
  const cleanTime = time.split('~')[0];

  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const [hour, minute] = cleanTime.split(':');
  const startTime = `${hour.padStart(2, '0')}:${minute}`;
  const endTime = `${String((Number(hour) + 1) % 24).padStart(2, '0')}:${minute}`;

  return `${year}/${month}/${day} ${startTime} ~ ${endTime}`;
}
