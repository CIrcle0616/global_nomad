import { format } from 'date-fns';
export function formatSelectedDateTime(
  date: Date,
  startTime: string,
  availableTimes: { startTime: string; endTime: string }[],
): string {
  const matched = availableTimes.find(t => t.startTime === startTime);
  if (!matched) return '';

  const dateStr = format(date, 'yy/MM/dd');

  return `${dateStr} ${startTime} ~ ${matched.endTime}`;
}
