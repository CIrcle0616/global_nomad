import { getActivities } from '@/services/activities';
import { GetActivitiesSuccessResponse } from '@/types/domain/activity/types';

export default function GetActivityFunction(
  page: number,
): Promise<GetActivitiesSuccessResponse & { page: number; totalPages: number }> {
  const size = 10;
  return getActivities('offset', undefined, undefined, undefined, undefined, page, size).then(
    (data: GetActivitiesSuccessResponse) => {
      const totalPages = Math.ceil(data.totalCount / size);
      return {
        ...data,
        page,
        totalPages,
      };
    },
  );
}
