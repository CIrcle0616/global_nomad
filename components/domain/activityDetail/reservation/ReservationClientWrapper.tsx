'use client';

import ReservationSection from '@/app/(main)/activities/[activityId]/ReservationSection';
import useIsAuthor from '@/hooks/useIsAuthor';

export default function ReservationClientWrapper({ activityUserId }: { activityUserId: number }) {
  const isAuthor = useIsAuthor(activityUserId);

  if (isAuthor) return null;

  return (
    <div className="ml-6">
      <div
        className="
              fixed bottom-0 left-0 w-full z-10 bg-white border-t shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
              md:sticky md:top-0 md:left-auto md:w-auto md:shadow-none
            "
      >
        <ReservationSection />
      </div>
    </div>
  );
}
