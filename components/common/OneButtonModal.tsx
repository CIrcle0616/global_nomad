'use client';
import { useOneButtonModalStore } from '@/store';

export default function OneButtonModal() {
  const { isOpen, content, buttonText, closeModal } = useOneButtonModalStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <p className="text-gray-900 text-xl-medium text-center">{content}</p>
        <div className="mt-6 flex justify-center">
          <button onClick={closeModal} className="bg-nomad-black text-white px-6 py-3 rounded-xl text-md-medium">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
