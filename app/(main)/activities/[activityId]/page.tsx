import ActivityDetailInfo from '@/components/domain/activityDetail/ActivityDetailInfo';
import ActivityDetailReview from '@/components/domain/activityDetail/ActivityDetailReview';
import ActivityMap from '@/components/domain/activityDetail/ActivityMap';
import ActivityDescription from '@/components/domain/activityDetail/ActivityDescription';
import ReservationClientWrapper from '@/components/domain/activityDetail/reservation/ReservationClientWrapper';
import { getActivitiesId } from '@/services/activities';
import React from 'react';

export default async function ActivityDetailPage({ params }: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await params;

  const data = await getActivitiesId(Number(activityId));

  return (
    <div className="w-[375px] md:w-[696px] lg:w-[900px] mx-auto mb-[133px] md:mb-[145px] lg:mb-[293px] relative">
      <ActivityDetailInfo data={data} />
      <div className="md:flex md:w-full">
        <div>
          <ActivityDescription data={data} />
          <ActivityMap address={data.address} />
          <ActivityDetailReview activityId={Number(activityId)} />
        </div>
        <div className="ml-6">
          <div
            className="
          fixed bottom-0 left-0 w-full z-10 bg-white border-t shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
          md:sticky md:top-0 md:left-auto md:w-auto md:shadow-none
        "
          >
            <ReservationClientWrapper activityUserId={data.userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
