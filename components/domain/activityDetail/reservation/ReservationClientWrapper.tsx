'use client';

import useUserStore from '@/store/useUserStore';
import ReservationSection from '@/app/(main)/activities/[activityId]/ReservationSection';

export default function ReservationClientWrapper({ activityUserId }: { activityUserId: number }) {
  const { user } = useUserStore();
  const isAuthor = user?.id !== activityUserId;

  if (!isAuthor) return null;

  return (
    <div>
      <ReservationSection />
    </div>
  );
}
