//날짜선택

import DatePicker from '@/components/common/DatePicker';

interface DateSelectorProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  availableDates: string[];
}

export default function DateSelector({ date, onSelect, availableDates }: DateSelectorProps) {
  return (
    <div className="flex justify-center">
      <DatePicker selected={date} onSelect={onSelect} availableDates={availableDates} />
    </div>
  );
}
