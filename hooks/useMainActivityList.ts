'use client';

import useMediaQuery from '@/store/useMediaQuery';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/services/activities';

export enum SizeByDeviceType {
  mobile = 4,
  tablet = 9,
  desktop = 8,
}

export default function useMainActivityList() {
  const searchParams = useSearchParams();
  const deviceType = useMediaQuery();
  const keyword = searchParams.get('keyword') || undefined;
  const page = Number(searchParams.get('page')) || undefined;
  const sort = searchParams.get('sort') || undefined;
  const category = searchParams.get('category') || undefined;
  let pageSize = SizeByDeviceType[deviceType];
  const hasKeyword = !!keyword;

  if (keyword && deviceType !== 'tablet') {
    pageSize = pageSize * 2;
  }

  const queryParams = { keyword, page, sort, category, size: pageSize };

  const { data, isPending } = useQuery({
    queryKey: ['activities', queryParams],
    queryFn: () => getActivities({ method: 'offset', ...queryParams }),
  });

  return { activities: data?.activities || [], hasKeyword, isPending };
}
