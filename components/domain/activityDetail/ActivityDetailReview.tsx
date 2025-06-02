'use client';
import ReviewHeader from './ReviewHeader';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@/services/activities';
import ReviewList from './ReviewList';

export default function ActivityDetailReview({ activityId }: { activityId: number }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['activityReview', activityId],
    queryFn: () => getReviews(activityId),
  });
  console.log(data);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  return (
    <div className="w-[327px] mt-10 md:w-[469px] md:mt-0 lg:w-[800px]">
      <div className="border-t border-gray-400 my-4 md:my-10 md:w-[469px] lg:w-[790px]"></div>
      <ReviewHeader data={data} />
      <ReviewList data={data} />
    </div>
  );
}
