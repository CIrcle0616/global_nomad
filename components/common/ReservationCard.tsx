import Image from 'next/image';

import CommonButton from '@/components/common/CommonButton';
import { statusMap } from '@/constants/statusMap';
import { ReservationWithActivityResponseDto } from '@/types/index';

export default function ReservationCard({ reservation }: { reservation: ReservationWithActivityResponseDto }) {
  const displayStatus = statusMap[reservation.status] || {
    text: reservation.status,
    color: '',
  };

  return (
    <div className="flex w-full max-w-full md:max-w-[600px] lg:max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="flex-shrink-0 w-[128px] md:w-[156px] lg:w-[204px] h-full relative">
        <Image
          src={reservation.activity.bannerImageUrl}
          alt={reservation.activity.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center p-4 flex-1 min-w-0">
        <p className={`text-lg-bold leading-tight ${displayStatus.color} mb-1`}>{displayStatus.text}</p>

        <h2 className="text-black font-semibold truncate whitespace-nowrap overflow-hidden leading-tight text-md-bold md:text-lg-bold lg:text-xl-bold mb-1 lg:mb-4">
          {reservation.activity.title}
        </h2>

        <p className="text-xs-regular text-nomad-black truncate leading-tight md:text-md-regular lg:text-2lg-regular mb-1 md:mb-2 lg:mb-4">
          {reservation.date} &nbsp;·&nbsp; {reservation.startTime} - {reservation.endTime} &nbsp;·&nbsp;
          {reservation.headCount}명
        </p>

        <div className="flex items-center justify-between mt-0 md:mt-2 lg:mt-4">
          <p className="text-lg-bold md:text-xl-bold lg:text-2xl-bold text-black">
            ₩{reservation.totalPrice.toLocaleString()}원
          </p>

          {reservation.status === 'pending' && (
            <CommonButton
              size="S"
              variant="secondary"
              className="h-[32px] md:h-[40px] lg:h-[43px] min-w-[80px] md:min-w-[112px] lg:min-w-[144px] rounded-[6px]"
            >
              예약 취소
            </CommonButton>
          )}

          {reservation.status === 'completed' && (
            <CommonButton
              size="S"
              variant="primary"
              className="h-[32px] md:h-[40px] lg:h-[43px] min-w-[80px] md:min-w-[112px] lg:min-w-[144px] rounded-[6px]"
            >
              후기 작성
            </CommonButton>
          )}
        </div>
      </div>
    </div>
  );
}
