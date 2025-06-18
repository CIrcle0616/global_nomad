//개수 카운트 커스텀 훅
import { useQuery } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/services/myActivities';

export const useReservationCount = (
  activityId: number,
  date: string,
  scheduleData: { scheduleId: number }[] | undefined,
  status: 'pending' | 'confirmed' | 'declined',
) => {
  return useQuery({
    queryKey: ['reservationCount', activityId, date, status],
    queryFn: async () => {
      let total = 0;
      for (const schedule of scheduleData ?? []) {
        const res = await getMyActivityReservations({
          activityId,
          scheduleId: schedule.scheduleId,
          status,
          size: 1,
        });
        total += res.totalCount;
      }
      return total;
    },
    enabled: !!scheduleData,
  });
};
