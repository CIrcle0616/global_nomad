'use client';

import ActivityCard from '@/components/domain/activity/ActivityCard';
import { useEffect, useRef, useState } from 'react';
import { InfiniteData, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { ActivityBasicDto } from '@/types';
import Link from 'next/link';
import { getMyActivities } from '@/services/myActivities';
import { GetMyActivitiesSuccessResponse } from '@/types/domain/myActivities/types';
import { getUserMe } from '@/services/users';
import EmptyState from '@/components/empty/EmptyState';
import SkeletonCard from '@/components/skeleton/SkeletonCard';

export default function ActivityManagePage() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getUserMe();
        setUserId(user.id);
      } catch (err) {
        console.error('내 ID 불러오기 실패:', err);
      }
    };

    fetchUserId();
  }, []);

  type PageType = GetMyActivitiesSuccessResponse;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: UseInfiniteQueryResult<InfiniteData<PageType>, Error> = useInfiniteQuery<
    PageType,
    Error,
    InfiniteData<PageType>,
    [string, string],
    number | undefined
  >({
    queryKey: ['myActivities', 'infinite'],
    queryFn: ({ pageParam = undefined }) => getMyActivities({ cursorId: pageParam }),
    getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
  });

  const observerRef = useRef<HTMLDivElement>(null);
  const emptyScreen = !data || data.pages.every(page => page.activities.length === 0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div className="flex justify-between items-center w-full max-w-[768px] mx-auto mb-6">
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">내 정보</h1>
        <Link href="/profile/activities/new">
          <button className=" bg-nomad-black hover:bg-green-500 transition-colors duration-200 text-white px-4 py-2 rounded shadow">
            체험 등록하기
          </button>
        </Link>
      </div>

      {!data ? (
        <SkeletonCard />
      ) : emptyScreen ? (
        <EmptyState />
      ) : (
        <div className="w-full max-w-[1000px] mx-auto px-4">
          <div className="grid gap-6">
            {data.pages.map(page =>
              page.activities.map((activity: ActivityBasicDto) => (
                <ActivityCard
                  key={activity.id}
                  title={activity.title}
                  img={activity.bannerImageUrl}
                  price={activity.price}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  userId={userId}
                  id={activity.id}
                />
              )),
            )}
          </div>
        </div>
      )}

      <div ref={observerRef} style={{ height: 1 }} />
      {isFetchingNextPage && <div>로딩 중...</div>}
    </div>
  );
}
