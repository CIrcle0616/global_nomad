import { useState } from 'react';

import { useModalStore } from '@/store/modalStore';
import { postMyReservations } from '@/services/myReservations';
import { ReservationWithActivityResponseDto } from '@/types/index';

import StarRating from './StarRating';
import CommonButton from '@/components/common/CommonButton';
import OneButtonModal from '@/components/common/modal/OneButtonModal';

export default function ReviewForm({
  reservation,
  onClose,
  onReviewSubmit,
}: {
  reservation: ReservationWithActivityResponseDto;
  onClose: () => void;
  onReviewSubmit?: () => void;
}) {
  const { openModal, closeModal: storeCloseModal } = useModalStore();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = rating === 0 || reviewText.trim() === '';

  const handleSubmit = async () => {
    if (isDisabled) return;

    setIsSubmitting(true);
    try {
      await postMyReservations({
        reservationId: reservation.id,
        body: { rating, content: reviewText },
      });

      console.log('후기 작성 완료');

      onReviewSubmit?.();

      openModal(OneButtonModal, {
        content: '후기가 성공적으로 등록되었습니다.',
        buttonText: '확인',
        onConfirm: () => {
          storeCloseModal();
          onClose();
        },
      });
    } catch (error) {
      console.error('후기 작성 실패', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <StarRating rating={rating} setRating={setRating} isDisabled={isSubmitting} />

      <textarea
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
        rows={8}
        placeholder="후기를 작성해주세요"
        className={`
          w-full h-[240px] border rounded p-2 text-lg-regular mb-6 resize-none
          transition-colors duration-300
          ${isSubmitting ? 'bg-gray-200 border-gray-500' : 'bg-white border-gray-300'}
          focus:outline-none focus:border-nomad-black
        `}
      />

      <CommonButton
        size="M"
        variant="primary"
        onClick={handleSubmit}
        disabled={isDisabled || isSubmitting}
        className={`
          w-full h-[56px] block rounded mb-4 transition-colors duration-300
          ${isDisabled || isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-nomad-black text-white'}
        `}
      >
        작성하기
      </CommonButton>
    </div>
  );
}
