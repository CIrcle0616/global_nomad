import { useModalStore } from '@/store';

interface OneButtonModalProps {
  content: string;
  buttonText?: string;
  onConfirm: () => void;
}

export default function OneButtonModal({ content, buttonText, onConfirm }: OneButtonModalProps) {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore();

  if (!isOpen || modalType !== 'oneButton' || !modalProps) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
      <div
        className="bg-white rounded-2xl p-8 w-[300px] sm:w-[400px] md:w-[500px] shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-xl-semibold text-center text-gray-900 mb-6">{content}</p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              onConfirm();
              closeModal();
            }}
            className="bg-nomad-black text-white text-md-medium rounded-xl px-6 py-3 w-32"
          >
            {buttonText || '확인'}
          </button>
        </div>
      </div>
    </div>
  );
}
