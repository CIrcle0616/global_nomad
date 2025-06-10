import { useModalStore } from '@/store/modalStore';
import CommonButton from '@/components/common/CommonButton';

interface OneButtonModalProps {
  content: string;
  buttonText?: string;
  onConfirm?: () => void;
}

export default function OneButtonModal({ content, buttonText, onConfirm }: OneButtonModalProps) {
  const { closeModal } = useModalStore();

  return (
    <div className="w-[87vw] p-[28px] bg-white rounded-lg shadow-lg md:w-[540px]">
      <div className="h-[66px] my-[25px] md:my-[40px] flex justify-center items-center">
        <p className="max-h-[100%] text-2lg-medium text-nomad-gray overflow-auto">{content}</p>
      </div>
      <div className="text-center md:text-right">
        <CommonButton
          size="M"
          type="submit"
          width="w-[138px]"
          onClick={() => {
            if (onConfirm) onConfirm();
            closeModal();
          }}
          className="p-[9px] text-md-medium h-[42px] md:w-[120px] md:h-[48px]"
        >
          {buttonText || '확인'}
        </CommonButton>
      </div>
    </div>
  );
}
