import { ActivityBasicDto } from '@/types';
import MainPagePopularActivity from './MainPagePopularActivity';

interface PopularActivityListProps {
  activities: ActivityBasicDto[];
}

export default function PopularActivityList({ activities }: PopularActivityListProps) {
  return (
    <ul className="flex gap-4 md:gap-8 lg:gap-6 overflow-x-auto w-screen scrollbar-hide -mx-4 pl-4 lg:overflow-x-hidden lg:w-full lg:mx-0 lg:p-0">
      {activities.map(activity => (
        <li key={activity.id}>
          <MainPagePopularActivity activity={activity} />
        </li>
      ))}
    </ul>
  );
}
