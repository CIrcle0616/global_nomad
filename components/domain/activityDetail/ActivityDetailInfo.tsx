import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityImgSection from './ActivityImgSection';
import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';

export default function ActivityDetailInfo({ data }: { data: GetActivityDetailSuccessResponse }) {
  return (
    <>
      <ActivityDetailHeader data={data} />
      <ActivityImgSection data={data} />
    </>
  );
}
