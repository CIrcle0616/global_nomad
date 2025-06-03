'use client';
import { useModalStore } from '@/store';

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
    <div className="bg-white rounded-2xl p-8 w-[300px] sm:w-[400px] md:w-[500px] shadow-lg">
      <p className="text-xl-semibold text-center text-gray-900 mb-6">{content}</p>
      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            onCancel();
            closeModal();
          }}
          className="bg-gray-300 text-black text-md-medium rounded-xl px-6 py-3 w-32"
        >
          {leftButtonText ? leftButtonText : '취소'}
        </button>
        <button
          onClick={() => {
            onConfirm?.({ closeModal });
          }}
          className="bg-nomad-black text-white text-md-medium rounded-xl px-6 py-3 w-32"
        >
          {rightButtonText ? rightButtonText : '확인'}
        </button>
      </div>
    </div>
  );
}
