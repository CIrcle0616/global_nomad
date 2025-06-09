import Image from 'next/image';

import { ReservationWithActivityResponseDto } from '@/types/index';

import ReviewForm from './ReviewForm';

export default function ReviewModal({
  reservation,
  closeModal,
  onReviewSubmit,
}: {
  reservation: ReservationWithActivityResponseDto;
  closeModal: () => void;
  onReviewSubmit?: () => void;
}) {
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <div className="w-full max-w-[480px] bg-white rounded-xl p-4" onClick={handleContainerClick}>
      <div className="flex justify-between items-center w-[343px] md:w-[432px] mx-auto mt-3 mb-10">
        <h2 className="text-2xl font-bold text-nomad-black">후기 작성</h2>
        <button onClick={closeModal} className="w-[40px] h-[40px] flex items-center justify-center">
          <Image src="/ic_x_40.svg" alt="닫기" width={40} height={40} />
        </button>
      </div>

      <div className="flex w-[343px] md:w-[432px] mx-auto mb-4">
        <div className="w-[126px] h-[126px] relative flex-shrink-0 rounded overflow-hidden">
          <Image
            src={reservation.activity.bannerImageUrl}
            alt={reservation.activity.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="ml-4 flex flex-col justify-between min-w-0 text-nomad-black">
          <p className="text-xl font-bold truncate">{reservation.activity.title}</p>
          <p className="text-2lg font-normal truncate">
            {reservation.date} · {reservation.startTime}-{reservation.endTime} · {reservation.headCount}명
          </p>
          <hr className="border-gray-200 w-full my-2" />
          <p className="text-xl md:text-2xl font-bold">₩{reservation.totalPrice.toLocaleString()}</p>
        </div>
      </div>

      <ReviewForm reservation={reservation} onClose={closeModal} onReviewSubmit={onReviewSubmit} />
    </div>
  );
}
