//테블릿 버전 배치

import CommonButton from '@/components/common/CommonButton';
import ParticipantSelector from './parts/ParticipantSelector';
import PriceTotal from './parts/PriceTotal';
import TabletDateTimeModal from './parts/TabletDateTimeModal';
import { formatSelectedDateTime } from '@/lib/format';
import { useModalStore } from '@/store/modalStore';

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
  availableTimes: { startTime: string; endTime: string }[];
  loading?: boolean;
  availableDates: string[];
  scheduleData?: {
    date: string;
    times: { startTime: string; endTime: string; id: number }[];
  }[];
}

export default function ReservationTablet({
  state,
  onDateChange,
  onTimeChange,
  onCountChange,
  onReserve,
  pricePerPerson,
  availableDates,
  loading = false,
  availableTimes,
  scheduleData,
}: ReservationTabletProps) {
  const { openModal } = useModalStore();
  const isReservable = !!state.date && state.time;

  const handleConfirm = () => {
    if (state.date && state.time) {
      onReserve();
    }
  };

  return (
    <>
      <div className="relative items-start flex">
        <div className="rounded-xl border p-4 shadow bg-white w-[251px]">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl-bold text-black">₩ {pricePerPerson.toLocaleString()}</span>
            <span className="text-lg-regular text-gray-900">/인</span>
          </div>
          <div className="border border-gray-300 mb-3" />

          <div className="mb-5">
            <span className="block text-black text-xl-bold">날짜</span>

            <div
              onClick={() =>
                openModal(TabletDateTimeModal, {
                  state,
                  onDateChange,
                  onTimeChange,
                  onReserve,
                  availableTimes,
                  availableDates,
                  loading,
                  scheduleData,
                })
              }
              className="text-black hover:underline cursor-pointer text-sm"
            >
              {state.date && state.time ? (
                formatSelectedDateTime(state.date, state.time, availableTimes)
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
