'use client';

import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addMonths, subMonths, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/style.css';

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  availableDates: string[];
}

export default function DatePicker({ selected, onSelect, availableDates }: DatePickerProps) {
  const [month, setMonth] = useState(new Date());
  const availableDateObjects = useMemo(() => availableDates.map(dateStr => parseISO(dateStr)), [availableDates]);

  return (
    <div className="z-[9999] bg-white space-y-2 rounded-lg border border-gray-200 py-2.5 w-[305px] h-[241px]">
      <div className="flex items-center justify-around w-[250px] mx-auto">
        <button
          onClick={() => setMonth(subMonths(month, 1))}
          className="text-[#4b4b4b] hover:text-black transition flex items-center"
        >
          &laquo;
        </button>

        <span className="text-sm font-bold text-black">{format(month, 'yyyy MMMM', { locale: ko })}</span>

        <button
          onClick={() => setMonth(addMonths(month, 1))}
          className="text-[#4b4b4b] hover:text-black transition flex items-center"
        >
          &raquo;
        </button>
      </div>

      <DayPicker
        month={month}
        onMonthChange={setMonth}
        mode="single"
        selected={selected}
        onSelect={onSelect}
        showOutsideDays
        locale={ko}
        disabled={{ before: new Date() }}
        /* eslint-disable camelcase */
        classNames={{
          root: '',
          nav: 'hidden',
          months: 'w-[250px] m-auto',
          month: 'w-full',
          table: 'w-full table-fixed',
          week: '',
          day: 'h-[32px] text-sm font-semibold text-[#4b4b4b] place-items-center ',
          weekday: 'text-sm font-bold text-[#4b4b4b]',
          month_grid: 'w-full',
        }}
        modifiers={{
          reservable: availableDateObjects,
        }}
        modifiersClassNames={{
          selected: '!bg-[#0b3b2d] !text-white rounded-lg',
          today: 'bg-[#ced8d5] text-[#0b3b2d] rounded-lg',
          outside: 'text-[#A4A1AA]',
          disabled: 'text-gray-400 line-through cursor-not-allwed',
          reservable:
            'after:block after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#00b894] after:mt-1 after:mx-auto',
        }}
      />
    </div>
  );
}
