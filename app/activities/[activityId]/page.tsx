import ActivityDetailInfo from '@/components/domain/activityDetail/ActivityDetailInfo';
import ActivityDetailReview from '@/components/domain/activityDetail/ActivityDetailReview';
import ActivityMap from '@/components/domain/activityDetail/ActivityMap';
import ActivityDescription from '@/components/domain/activityDetail/ActivityDescription';
import ReservationSection from './ReservationSection';
import { getActivitiesId } from '@/services/activities';
import React from 'react';

export default async function ActivityDetailPage({ params }: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await params;

  const data = await getActivitiesId(Number(activityId));

  return (
    <div className="w-[375px] md:w-[696px] lg:w-[1200px] mx-auto mb-[133px] md:mb-[145px] lg:mb-[293px]">
      <ActivityDetailInfo data={data} />
      <div className="md:flex md:w-full">
        <div>
          <ActivityDescription data={data} />
          <ActivityMap address={data.address} />
          <ActivityDetailReview activityId={Number(activityId)} />
        </div>
        <div className="md:w-[251px] lg:w-[384px]">
          <ReservationSection />
        </div>
      </div>
    </div>
  );
}
