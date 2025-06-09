import { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import { useModalStore } from '@/store/modalStore';
import { statusMap } from '@/constants/statusMap';
import { patchMyReservations } from '@/services/myReservations';

import CommonButton from '@/components/common/CommonButton';
import TwoButtonModal from '@/components/common/modal/TwoButtonModal';
import ReviewModal from '@/components/domain/reservation/ReviewModal';

import { ReservationWithActivityResponseDto } from '@/types/index';

export default function ReservationCard({ reservation }: { reservation: ReservationWithActivityResponseDto }) {
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const [reviewSubmitted, setReviewSubmitted] = useState(reservation.reviewSubmitted);

  const handleCancelReservation = () => {
    openModal(TwoButtonModal, {
      content: '예약을 취소하시겠어요?',
      leftButtonText: '아니오',
      rightButtonText: '취소하기',
      onConfirm: async ({ closeModal }: { closeModal: () => void }) => {
        try {
          await patchMyReservations({ reservationId: reservation.id, body: { status: 'canceled' } });
          console.log('예약 취소 성공');

          await queryClient.invalidateQueries({ queryKey: ['myReservations'] });

          closeModal();
        } catch (error) {
          console.error('예약 취소 실패', error);
        }
      },
      onCancel: () => {
        console.log('취소 버튼 클릭');
      },
    });
  };

  const statusInfo = statusMap[reservation.status] || {
    text: reservation.status,
    color: '',
  };
  // 상태별 텍스트 색상 클래스명 조건부 렌더링
  const statusTextColorClass =
    reservation.status === 'pending'
      ? 'text-blue-300'
      : reservation.status === 'canceled'
        ? 'text-gray-800'
        : reservation.status === 'confirmed'
          ? 'text-orange-500'
          : reservation.status === 'declined'
            ? 'text-red-500'
            : reservation.status === 'completed'
              ? 'text-gray-800'
              : '';

  return (
    <div className="flex w-full max-w-full md:max-w-[600px] lg:max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="flex-shrink-0 w-[128px] md:w-[156px] lg:w-[204px] h-full relative">
        <Image
          src={reservation.activity.bannerImageUrl}
          alt={reservation.activity.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center p-4 flex-1 min-w-0">
        <p className={`text-lg-bold leading-tight mb-1 ${statusTextColorClass}`}>{statusInfo.text}</p>

        <h2 className="text-black font-semibold truncate whitespace-nowrap overflow-hidden leading-tight text-md-bold md:text-lg-bold lg:text-xl-bold mb-1 lg:mb-4">
          {reservation.activity.title}
        </h2>

        <p className="text-xs-regular text-nomad-black truncate leading-tight md:text-md-regular lg:text-2lg-regular mb-1 md:mb-2 lg:mb-4">
          {reservation.date} &nbsp;·&nbsp; {reservation.startTime} - {reservation.endTime} &nbsp;·&nbsp;{' '}
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
              onClick={handleCancelReservation}
              className="h-[32px] md:h-[40px] lg:h-[43px] min-w-[80px] md:min-w-[112px] lg:min-w-[144px] rounded-[6px]"
            >
              예약 취소
            </CommonButton>
          )}

          {reservation.status === 'completed' && (
            <>
              {reviewSubmitted ? (
                <CommonButton
                  size="S"
                  variant="secondary"
                  disabled
                  className="h-[32px] md:h-[40px] lg:h-[43px] min-w-[80px] md:min-w-[112px] lg:min-w-[144px] rounded-[6px] bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  작성 완료
                </CommonButton>
              ) : (
                <CommonButton
                  size="S"
                  variant="primary"
                  onClick={() =>
                    openModal(ReviewModal, {
                      reservation,
                      closeModal: () => {
                        queryClient.invalidateQueries({ queryKey: ['myReservations'] });
                        const { closeModal } = useModalStore.getState();
                        closeModal();
                      },

                      onReviewSubmit: () => setReviewSubmitted(true),
                    })
                  }
                  className="h-[32px] md:h-[40px] lg:h-[43px] min-w-[80px] md:min-w-[112px] lg:min-w-[144px] rounded-[6px]"
                >
                  후기 작성
                </CommonButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
