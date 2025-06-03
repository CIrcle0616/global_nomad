import { useModalStore } from '@/store/modalStore';

interface OneButtonModalProps {
  content: string;
  buttonText?: string;
  onConfirm?: () => void;
}

export default function OneButtonModal({ content, buttonText, onConfirm }: OneButtonModalProps) {
  const { closeModal } = useModalStore();

  return (
    <div className="bg-white rounded-2xl p-8 w-[300px] sm:w-[400px] md:w-[500px] shadow-lg">
      <p className="text-xl-semibold text-center text-gray-900 mb-6">{content}</p>
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (onConfirm) onConfirm();
            closeModal();
          }}
          className="bg-nomad-black text-white text-md-medium rounded-xl px-6 py-3 w-32"
        >
          {buttonText || '확인'}
        </button>
      </div>
    </div>
  );
}
