import ChevronIcon from '@/components/common/icons/ChevronIcon';

interface ListControlProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export default function ListControl({ onPrev, onNext, isPrevDisabled, isNextDisabled }: ListControlProps) {
  return (
    <div className="flex gap-3">
      <button onClick={onPrev} disabled={isPrevDisabled} className=" ">
        <ChevronIcon direction="left" color={isPrevDisabled ? '#a1a1a1' : '#4b4b4b'} />
      </button>
      <button onClick={onNext} disabled={isNextDisabled}>
        <ChevronIcon direction="right" color={isNextDisabled ? '#a1a1a1' : '#4b4b4b'} />
      </button>
    </div>
  );
}
