//인원선택

import CommonButton from '@/components/common/CommonButton';
import Image from 'next/image';
import PlusIcon from '@/public/ic_plus.svg';
import MinusIcon from '@/public/ic_minus.svg';

interface ParticipantSelectorProps {
  count: number;
  setCount: (count: number) => void;
  min?: number;
  max?: number;
}
export default function ParticipantSelector({ count, setCount, min = 0, max = 999 }: ParticipantSelectorProps) {
  return (
    <div className="flex items-center justify-center border rounded-lg cursor-pointer transition w-[117px] bg-white text-black border-gray-300 shadow-md">
      <CommonButton
        type="button"
        size="S"
        variant="secondary"
        onClick={() => setCount(Math.max(count - 1, min))}
        aria-label="인원 증가"
        className="flex items-center justify-content border-none w-[40px] h-[40px]"
      >
        <Image src={MinusIcon} alt="인원 증가" className="w-[20px] h-[20px]" />
      </CommonButton>
      <span className="mx-2 min-w-[20px] text-gray-900 text-center text-md-regular">{count}</span>

      <CommonButton
        type="button"
        size="S"
        variant="secondary"
        onClick={() => setCount(Math.min(count + 1, max))}
        aria-label="인원 감소"
        className="flex items-center justify-content border-none w-[40px] h-[40px]"
      >
        <Image src={PlusIcon} alt="인원 감소" className="w-[20px] h-[20px]" />
      </CommonButton>
    </div>
  );
}
