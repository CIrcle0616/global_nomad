import { getActivities } from '@/services/activities';
import { ActivityBasicDto } from '@/types';
import { GetActivitiesSuccessResponse } from '@/types/domain/activity/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const ITEMS_PER_PAGE_DESKTOP = 3;

export default function usePopularActivities() {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isPending } = useQuery<GetActivitiesSuccessResponse>({
    queryKey: ['activities', 'popularList'],
    queryFn: () => getActivities({ method: 'offset', sort: 'most_reviewed', size: 9 }),
  });

  const activities = useMemo(() => data?.activities || [], [data]);

  const desktopPages = useMemo(() => {
    if (!activities.length) return [];

    const pages: ActivityBasicDto[][] = [];
    for (let i = 0; i < activities.length; i += ITEMS_PER_PAGE_DESKTOP) {
      pages.push(activities.slice(i, i + ITEMS_PER_PAGE_DESKTOP));
    }
    return pages;
  }, [activities]);

  const totalPages = desktopPages.length;

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === totalPages - 1;
  const currentActivitiesForDesktop = desktopPages[currentPage] || [];

  return { isPending, activities, currentActivitiesForDesktop, handlePrev, handleNext, isPrevDisabled, isNextDisabled };
}
