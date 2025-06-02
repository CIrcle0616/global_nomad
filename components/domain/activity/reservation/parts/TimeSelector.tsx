//시간선택
import clsx from 'clsx';

export default function TimeSelector({
  times,
  selected,
  onChange,
  disabled,
}: {
  times: string[];
  selected: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto">
      {times.map(time => (
        <label
          key={time}
          className={clsx(
            'flex items-center justify-center text-lg-medium border rounded-lg px-4 py-2 cursor-pointer transition w-[117px] mb-2',
            selected === time
              ? 'bg-black text-lg-medium text-white border-black'
              : 'bg-white text-black text-lg-medium border-black',
            'hover:border-black',
          )}
        >
          <input
            type="radio"
            checked={selected === time}
            onChange={() => onChange(time)}
            disabled={disabled}
            name="reserve-time"
            className="hidden"
          />
          {time}
        </label>
      ))}
    </div>
  );
}
