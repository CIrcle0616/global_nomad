import ActivityDetailInfo from '@/components/domain/activityDetail/ActivityDetailInfo';
import ActivityDetailReview from '@/components/domain/activityDetail/ActivityDetailReview';
import ActivityMap from '@/components/domain/activityDetail/ActivityMap';
import ActivityDescription from '@/components/domain/activityDetail/ActivityDescription';
import ReservationClientWrapper from '@/components/domain/activityDetail/reservation/ReservationClientWrapper';
import { getActivitiesId } from '@/services/activities';
import DynamicLayoutWrapper from '@/components/domain/activityDetail/DynamicLayoutWrapper';
import React from 'react';

export default async function ActivityDetailPage({ params }: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await params;

  const data = await getActivitiesId(Number(activityId));

  return (
    <div className="w-[375px] md:w-[696px] lg:w-[900px] mx-auto mb-[133px] md:mb-[145px] lg:mb-[293px] relative">
      <ActivityDetailInfo data={data} />

      <DynamicLayoutWrapper
        activityUserId={data.userId}
        mainContent={
          <>
            <ActivityDescription data={data} />
            <ActivityMap address={data.address} />
            <ActivityDetailReview activityId={Number(activityId)} />
          </>
        }
      >
        <ReservationClientWrapper activityUserId={data.userId} />
      </DynamicLayoutWrapper>
    </div>
  );
}
