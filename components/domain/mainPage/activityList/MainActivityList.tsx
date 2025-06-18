'use client';

import useMainActivityList from '@/hooks/useMainActivityList';
import MainPageBasicActivity from './MainPageBasicActivity';
import Link from 'next/link';
import MainPagination from './MainPagination';

const listClasses =
  'grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-3 md:grid-rows-3 md:gap-x-4 md:gap-y-8 lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-6 lg:gap-y-12';

interface MainActivityListProps {
  totalCount: number | undefined;
}

export default function MainActivityList({ totalCount }: MainActivityListProps) {
  const { activities, hasKeyword } = useMainActivityList();

  return (
    <section className={`${hasKeyword ? 'mt-6' : 'mt-6 md:mt-8'} min-h-screen pb-20`}>
      <ul className={listClasses}>
        {activities.map(activity => (
          <li key={activity.id}>
            <Link href={`/activities/${activity.id}`}>
              <MainPageBasicActivity activity={activity} />
            </Link>
          </li>
        ))}
        <MainPagination totalCount={totalCount} />
      </ul>
    </section>
  );
}
