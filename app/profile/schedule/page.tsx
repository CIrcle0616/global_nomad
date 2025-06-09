import { getMyActivities, getMyReservationBoard } from '@/services/myActivities';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import ScheduleClientInner from './ScheduleClientInner';

export default async function SchedulePage() {
  const { activities } = await getMyActivities({});

  const today = new Date();
  const year = format(today, 'yyyy');
  const month = format(today, 'MM');
  const firstActivityId = activities[0]?.id;

  const queryClient = new QueryClient();

  if (firstActivityId) {
    await queryClient.prefetchQuery({
      queryKey: ['reservationBoard', firstActivityId, year, month],
      queryFn: () => getMyReservationBoard({ activityId: firstActivityId, year, month }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleClientInner activityList={activities} />
    </HydrationBoundary>
  );
}
