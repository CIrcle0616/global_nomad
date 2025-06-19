//예약이 존재하는 스케줄만

import { useQuery } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/services/myActivities';

interface Schedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
}

export const useAvailableSchedules = (
  activityId: number,
  date: string,
  scheduleData: Schedule[] | undefined,
  statusTab: 'pending' | 'confirmed' | 'declined',
) => {
  return useQuery({
    queryKey: ['availableSchedules', activityId, date, statusTab],
    queryFn: async () => {
      const valid: Schedule[] = [];

      for (const schedule of scheduleData ?? []) {
        const res = await getMyActivityReservations({
          activityId,
          scheduleId: schedule.scheduleId,
          status: statusTab,
          size: 1,
        });

        if (res.totalCount > 0) {
          valid.push(schedule);
        }
      }
      return valid;
    },
    enabled: !!scheduleData && scheduleData.length > 0 && !!statusTab,
  });
};
