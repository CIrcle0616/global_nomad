'use client';

import ReviewHeader from './ReviewHeader';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@/services/activities';
import ReviewList from './ReviewList';
import { useState, useMemo, useEffect } from 'react';
import ReviewPagination from './ReviewPagination';

export default function ActivityDetailReview({ activityId }: { activityId: number }) {
  const [filter, setFilter] = useState<'최신 순' | '별점 높은 순' | '별점 낮은 순'>('최신 순');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const { data, isPending, isError } = useQuery({
    queryKey: ['activityReview', activityId],
    queryFn: () =>
      getReviews({
        activityId,
        size: 1000, // 백엔드에서 sort기능 지원 x => 충분한 양의 리뷰 가져오기
      }),
  });

  // 필터 바뀌면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

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

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="w-[327px] mt-10 md:w-[469px] md:mt-0 lg:w-[500px] mx-auto">
      <div className="md:border-t md:border-gray-400 my-4 md:my-10 md:w-[469px] lg:w-[489px]" />
      <ReviewHeader data={data} filter={filter} setFilter={setFilter} />
      <ReviewList reviews={currentReviews} />
      <ReviewPagination
        totalCount={sortedReviews.length}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}
