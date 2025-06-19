//시간선택
import clsx from 'clsx';
import { format } from 'date-fns';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

export default function TimeSelector({
  times,
  selected,
  onChange,
  disabled,
  date,
}: {
  times: TimeSlot[];
  selected: string;
  onChange: (startTime: string) => void;
  disabled?: boolean;
  date?: Date;
}) {
  const now = new Date();
  const isPast = (startTime: string) => {
    if (!date) return false;
    const timeStart = new Date(`${format(date, 'yyyy-MM-dd')}T${startTime}`);
    return timeStart < now;
  };

  return (
    <div className="flex gap-3 overflow-x-auto">
      {times.map(({ startTime, endTime }) => {
        const timePassed = isPast(startTime);
        const isDisabled = disabled || timePassed;

        return (
          <label
            key={startTime}
            className={clsx(
              'flex items-center justify-center text-lg-medium border rounded-lg px-4 py-2 cursor-pointer transition w-[117px] mb-2',
              selected === startTime
                ? 'bg-black text-lg-medium text-white border-black'
                : 'bg-white text-black text-lg-medium border-black',
              'hover:border-black',
              isDisabled && 'text-gray-400 line-through bg-gray-100 cursor-not-allowed border-gray-400',
            )}
          >
            <input
              type="radio"
              checked={selected === startTime}
              onChange={() => onChange(startTime)}
              disabled={isDisabled}
              name="reserve-time"
              className="absolute opacity-0 w-0 h-0"
            />
            {`${startTime}~${endTime}`}
          </label>
        );
      })}
    </div>
  );
}
