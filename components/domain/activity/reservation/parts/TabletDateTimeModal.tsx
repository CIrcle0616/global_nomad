// 'use client';

// import { useTabletModalStore } from '@/store/useReservationTabletStore';
// import DateSelector from './DateSelector';
// import TimeSelector from './TimeSelector';
// import CommonButton from '@/components/common/CommonButton';
// import { useEffect, useRef, useState } from 'react';

// interface TabletDateTimeModalProps {
//   state: {
//     date: Date | undefined;
//     time: string;
//   };

//   onDateChange: (date: Date | undefined) => void;
//   onTimeChange: (time: string) => void;
//   onReserve: () => void;
//   availableTimes: { startTime: string; endTime: string }[];
//   loading?: boolean;
// }

// export default function TabletDateTimeModal({
//   state,
//   onDateChange,
//   onTimeChange,
//   onReserve,
//   availableTimes,
//   loading = false,
// }: TabletDateTimeModalProps) {
//   const { isOpen, toggleModal } = useTabletModalStore();
//   const modalRef = useRef<HTMLDivElement>(null);

//   const [tempDate, setTempDate] = useState<Date | undefined>(state.date);
//   const [tempTime, setTempTime] = useState<string>(state.time);

//   const isReservable = !!tempDate && tempTime;

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         toggleModal();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, toggleModal]);

//   useEffect(() => {
//     if (isOpen) {
//       setTempDate(state.date);
//       setTempTime(state.time);
//     }
//   }, [isOpen, state.date, state.time]);

//   if (!isOpen) return null;

//   return (
//     <div ref={modalRef} className="rounded-xl border p-4 shadow bg-white mt-[100px] ml-[40px] w-[300px]">
//       <div className="mb-2">
//         <span className="block text-black mb-1 text-2xl-bold">날짜</span>
//         <div className="mt-4">
//           <DateSelector date={tempDate} onSelect={setTempDate} />
//         </div>
//       </div>

//       {tempDate && (
//         <div className="mt-[30px]">
//           <span className="block text-black mb-1 text-2lg-bold">예약 가능한 시간</span>
//           <div className="mt-2">
//             {availableTimes.length > 0 ? (
//               <TimeSelector times={availableTimes} selected={tempTime} onChange={setTempTime} disabled={loading} />
//             ) : (
//               <p className="text-sm text-gray-500">예약 가능한 시간이 없습니다.</p>
//             )}
//           </div>
//         </div>
//       )}

//       <CommonButton
//         size="M"
//         className="w-full mt-8 rounded-md"
//         disabled={!isReservable || loading}
//         onClick={() => {
//           if (tempDate) onDateChange(tempDate);
//           onTimeChange(tempTime);
//           onReserve();
//           toggleModal();
//         }}
//       >
//         예약하기
//       </CommonButton>
//     </div>
//   );
// }

'use client';

import { useModalStore } from '@/store/modalStore';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import CommonButton from '@/components/common/CommonButton';
import { useEffect, useState } from 'react';

interface TabletDateTimeModalProps {
  state: {
    date: Date | undefined;
    time: string;
  };
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onReserve: () => void;
  availableTimes: { startTime: string; endTime: string }[];
  loading?: boolean;
}

export default function TabletDateTimeModal({
  state,
  onDateChange,
  onTimeChange,
  onReserve,
  availableTimes,
  loading = false,
}: TabletDateTimeModalProps) {
  const { closeModal } = useModalStore();

  const [tempDate, setTempDate] = useState<Date | undefined>(state.date);
  const [tempTime, setTempTime] = useState<string>(state.time);

  const isReservable = !!tempDate && tempTime;

  useEffect(() => {
    setTempDate(state.date);
    setTempTime(state.time);
  }, [state.date, state.time]);

  return (
    <div className="rounded-xl border p-4 shadow bg-white mt-[100px] ml-[40px] w-[300px]">
      <div className="mb-2">
        <span className="block text-black mb-1 text-2xl-bold">날짜</span>
        <div className="mt-4">
          <DateSelector date={tempDate} onSelect={setTempDate} />
        </div>
      </div>

      {tempDate && (
        <div className="mt-[30px]">
          <span className="block text-black mb-1 text-2lg-bold">예약 가능한 시간</span>
          <div className="mt-2">
            {availableTimes.length > 0 ? (
              <TimeSelector times={availableTimes} selected={tempTime} onChange={setTempTime} disabled={loading} />
            ) : (
              <p className="text-sm text-gray-500">예약 가능한 시간이 없습니다.</p>
            )}
          </div>
        </div>
      )}

      <CommonButton
        size="M"
        className="w-full mt-8 rounded-md"
        disabled={!isReservable || loading}
        onClick={() => {
          if (tempDate) onDateChange(tempDate);
          onTimeChange(tempTime);
          onReserve();
          closeModal();
        }}
      >
        예약하기
      </CommonButton>
    </div>
  );
}
