'use client';
import { useTwoButtonModalStore } from '@/store';

export default function TwoButtonModal() {
  const { isOpen, content, rightButtonText, leftButtonText, onConfirm, onCancel, closeModal } =
    useTwoButtonModalStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <p className="text-gray-900 text-xl-medium text-center">{content}</p>
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={() => {
              onCancel?.();
              closeModal();
            }}
            className="bg-gray-300 text-black px-6 py-3 rounded-xl text-md-medium"
          >
            {leftButtonText ?? '취소'}
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              closeModal();
            }}
            className="bg-nomad-black text-white px-6 py-3 rounded-xl text-md-medium"
          >
            {rightButtonText ?? '확인'}
          </button>
        </div>
      </div>
    </div>
  );
}
