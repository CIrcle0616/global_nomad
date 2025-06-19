'use client';

// import useMediaQuery from '@/store/useMediaQuery';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/services/activities';
import { ActivitySearchParams } from '@/app/(main)/page';
import { activitiesKeys } from '@/lib/queryKeys';
import useMediaQuery from '@/store/useMediaQuery';
import { SizeByDeviceType } from '@/constants/sizeByDeviceType';

export default function useMainActivityList() {
  const searchParams = useSearchParams();
  const deviceType = useMediaQuery();
  let size = SizeByDeviceType[deviceType];
  const keyword = searchParams.get('keyword') || undefined;
  const page = Number(searchParams.get('page')) || undefined;
  const sort = searchParams.get('sort') || undefined;
  const category = searchParams.get('category') || undefined;
  const hasKeyword = !!keyword;

  if (keyword && deviceType !== 'tablet') {
    size = size * 2;
  }

  const queryKey = activitiesKeys.list({
    keyword,
    category,
    sort,
    page: page ? Number(page) : 1,
    size,
  });

  const { data, isPending } = useQuery({
    queryKey: queryKey,
    queryFn: ({ queryKey }) => getActivities(queryKey[2] as ActivitySearchParams),
  });

  return { activities: data?.activities || [], hasKeyword, isPending, size };
}
