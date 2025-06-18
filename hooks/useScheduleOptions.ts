export const useScheduleOptions = (
  scheduleData: { scheduleId: number; startTime: string; endTime: string }[] | undefined,
) => {
  return (scheduleData ?? [])
    .slice()
    .sort((a, b) => a.startTime.localeCompare(b.startTime)) //시간순 정렬
    .map(s => ({
      id: s.scheduleId,
      startTime: s.startTime,
      endTime: s.endTime,
    }));
};
