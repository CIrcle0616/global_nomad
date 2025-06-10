'use client';
import Image from 'next/image';
import { useModalStore } from '@/store/modalStore';
import CommonButton from '@/components/common/CommonButton';
import ModalIconSrc from '@/public/ic_modal_check.svg';

interface ModalProps {
  content: string;
  rightButtonText?: string;
  leftButtonText?: string;
  onConfirm?: (options: { closeModal: () => void }) => void;
  onCancel: () => void;
}

export default function TwoButtonModal({ content, rightButtonText, leftButtonText, onConfirm, onCancel }: ModalProps) {
  const { closeModal } = useModalStore();

  return (
    <div className="relative w-[298px] p-[24px] bg-white rounded-lg shadow-lg">
      <div className="absolute w-6 h-6 top-6 left-0 right-0 mx-auto">
        <Image src={ModalIconSrc} width={24} height={24} alt="" />
      </div>
      <div className="mt-[40px] mb-[32px] flex justify-center items-center">
        <p className="max-h-[62px] text-2lg-medium text-nomad-gray overflow-auto">{content}</p>
      </div>
      <div className="flex justify-center gap-2">
        <CommonButton
          size="S"
          type="submit"
          width="w-[80px]"
          variant="secondary"
          onClick={() => {
            onCancel();
            closeModal();
          }}
        >
          {leftButtonText ? leftButtonText : '취소'}
        </CommonButton>
        <CommonButton
          size="S"
          type="submit"
          width="w-[80px]"
          onClick={() => {
            onConfirm?.({ closeModal });
          }}
        >
          {rightButtonText ? rightButtonText : '확인'}
        </CommonButton>
      </div>
    </div>
  );
}
