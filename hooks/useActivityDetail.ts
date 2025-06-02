import { getActivitiesId } from '@/services/activities';
import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';
import { useQuery } from '@tanstack/react-query';

export function useActivityDetail(activityId: number) {
  return useQuery<GetActivityDetailSuccessResponse>({
    queryKey: ['activityDetail', { activityId }],
    queryFn: () => getActivitiesId(activityId),
  });
}
