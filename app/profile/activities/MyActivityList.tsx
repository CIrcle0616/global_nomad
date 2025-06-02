import { fetchWrapper } from '@/services/fetchWrapper';
import { operations } from '@/types/api';

type ActivityResponse = operations['FindActivity']['responses']['200']['content']['application/json'];

export default function GetActivityFunction(
  page: number,
): Promise<ActivityResponse & { page: number; totalPages: number }> {
  return fetchWrapper(`/activities?method=offset&page=${page}&size=10`, 'GET').then(response => {
    const data = response as ActivityResponse;
    const size = 10;
    const totalPages = Math.ceil(data.totalCount / size);

    return {
      ...data,
      page,
      totalPages: totalPages,
    };
  });
}
