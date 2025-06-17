'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useModalStore } from '@/store/modalStore';
import { statusMap } from '@/constants/statusMap';
import { patchMyReservations } from '@/services/myReservations';

import CommonButton from '@/components/common/CommonButton';
import TwoButtonModal from '@/components/common/modal/TwoButtonModal';
import ReviewModal from '@/components/domain/reservation/ReviewModal';
import OneButtonModal from '@/components/common/modal/OneButtonModal';

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
      containerClassName: 'p-[20px] w-[300px] bg-white rounded-lg shadow-lg md:w-[360px]',
      onConfirm: async ({ closeModal }: { closeModal: () => void }) => {
        try {
          await patchMyReservations({ reservationId: reservation.id, body: { status: 'canceled' } });
          await queryClient.invalidateQueries({ queryKey: ['myReservations'] });
          closeModal();

          toast.success('예약이 취소되었습니다.', {
            duration: 3000,
          });
        } catch (error) {
          console.error('예약 취소 실패', error);
          toast.error('예약 취소에 실패했습니다.');
        }
      },
      onCancel: () => {},
    });
  };

  const statusInfo = statusMap[reservation.status] || {
    text: reservation.status,
    color: '',
  };

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

  const buttonPlaceholderClass =
    'h-[32px] md:h-[40px] lg:h-[43px] min-w-[80px] md:min-w-[112px] lg:min-w-[144px] text-[14px] rounded-[6px]';

  const buttonClass =
    '!h-[32px] md:!h-[40px] lg:!h-[43px] !min-w-[80px] md:!min-w-[112px] lg:!min-w-[144px] text-[14px] md:text-[16px] lg:text-[18px] rounded-[6px] !p-[6px] md:!p-[8px]';

  return (
    <div className="flex w-full max-w-full md:max-w-[600px] lg:max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="flex-shrink-0 w-[128px] md:w-[156px] lg:w-[204px] h-full relative">
        <Image
          src={reservation.activity.bannerImageUrl}
          alt={reservation.activity.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 204px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center p-2 flex-1 min-w-0">
        <p className={`text-md-bold md:text-lg-bold leading-tight mb-1 ${statusTextColorClass}`}>{statusInfo.text}</p>

        <h2 className="text-black font-semibold truncate whitespace-nowrap overflow-hidden leading-tight text-md-bold md:text-lg-bold lg:text-xl-bold mb-1 lg:mb-4">
          {reservation.activity.title}
        </h2>

        <p className="text-xs-regular text-nomad-black truncate leading-tight md:text-md-regular lg:text-2lg-regular mb-1 md:mb-2 lg:mb-4">
          {reservation.date} &nbsp;·&nbsp; {reservation.startTime} - {reservation.endTime} &nbsp;·&nbsp;{' '}
          {reservation.headCount}명
        </p>

        <div className="flex items-center justify-between mt-0 md:mt-2 lg:mt-4">
          <p className="text-lg-bold mt-2 md:text-xl-bold lg:text-2xl-bold text-black">
            ₩{reservation.totalPrice.toLocaleString()}원
          </p>

          <div>
            {reservation.status === 'pending' && (
              <CommonButton size="S" variant="secondary" onClick={handleCancelReservation} className={buttonClass}>
                예약 취소
              </CommonButton>
            )}

            {reservation.status === 'completed' &&
              (reviewSubmitted ? (
                <CommonButton
                  size="S"
                  variant="secondary"
                  disabled
                  className={`${buttonClass} bg-gray-300 text-gray-500 cursor-not-allowed`}
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
                      onReviewSubmit: () => {
                        setReviewSubmitted(true);
                        openModal(OneButtonModal, {
                          content: '후기가 성공적으로 등록되었습니다.',
                          buttonText: '확인',
                          onConfirm: () => {
                            const { closeModal } = useModalStore.getState();
                            closeModal();
                          },
                        });
                      },
                    })
                  }
                  className={buttonClass}
                >
                  후기 작성
                </CommonButton>
              ))}

            {!['pending', 'confirmed', 'completed'].includes(reservation.status) && (
              <div className={buttonPlaceholderClass} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
