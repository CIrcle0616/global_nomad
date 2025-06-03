export function formatSelectedDateTime(
  date: Date,
  startTime: string,
  availableTimes: { startTime: string; endTime: string }[],
): string {
  const matched = availableTimes.find(t => t.startTime === startTime);
  if (!matched) return '';

  const { endTime } = matched;

  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day} ${startTime} ~ ${endTime}`;
}
