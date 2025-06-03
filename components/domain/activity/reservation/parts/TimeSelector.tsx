//시간선택
import clsx from 'clsx';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

export default function TimeSelector({
  times,
  selected,
  onChange,
  disabled,
}: {
  times: TimeSlot[];
  selected: string;
  onChange: (startTime: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto">
      {times.map(({ startTime, endTime }) => (
        <label
          key={startTime}
          className={clsx(
            'flex items-center justify-center text-lg-medium border rounded-lg px-4 py-2 cursor-pointer transition w-[117px] mb-2',
            selected === startTime
              ? 'bg-black text-lg-medium text-white border-black'
              : 'bg-white text-black text-lg-medium border-black',
            'hover:border-black',
          )}
        >
          <input
            type="radio"
            checked={selected === startTime}
            onChange={() => onChange(startTime)}
            disabled={disabled}
            name="reserve-time"
            className="hidden"
          />
          {`${startTime}~${endTime}`}
        </label>
      ))}
    </div>
  );
}
