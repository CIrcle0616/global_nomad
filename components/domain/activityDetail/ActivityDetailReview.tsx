'use client';
import ReviewHeader from './ReviewHeader';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@/services/activities';
import ReviewList from './ReviewList';
import { useState, useMemo } from 'react';

export default function ActivityDetailReview({ activityId }: { activityId: number }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['activityReview', activityId],
    queryFn: () => getReviews({ activityId, size: 1000 }),
  });

  const [filter, setFilter] = useState<'최신 순' | '별점 높은 순' | '별점 낮은 순'>('최신 순');

  const sortedReviews = useMemo(() => {
    if (!data?.reviews) return [];

    const reviewsCopy = [...data.reviews];

    if (filter === '별점 높은 순') {
      return reviewsCopy.sort((a, b) => b.rating - a.rating);
    }
    if (filter === '별점 낮은 순') {
      return reviewsCopy.sort((a, b) => a.rating - b.rating);
    }
    return reviewsCopy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [data?.reviews, filter]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  return (
    <div className="w-[327px] mt-10 md:w-[469px] md:mt-0 lg:w-[800px]">
      <div className="border-t border-gray-400 my-4 md:my-10 md:w-[469px] lg:w-[790px]"></div>
      <ReviewHeader data={data} filter={filter} setFilter={setFilter} />
      <ReviewList reviews={sortedReviews} />
    </div>
  );
}
