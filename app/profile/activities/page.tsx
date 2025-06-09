'use client';

import { useAuthStore } from '@/store/useAuthStore';
import ActivityCard from '@/components/domain/activity/ActivityCard';
import { useEffect, useRef } from 'react';
import { InfiniteData, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { ActivityBasicDto } from '@/types';
import Link from 'next/link';
import { getMyActivities } from '@/services/myActivities';
import { GetMyActivitiesSuccessResponse } from '@/types/domain/myActivities/types';
export default function ActivityManagePage() {
  const setAuth = useAuthStore(state => state.setAuth);

  //어차피 나중에 로그인 합쳐지면 없어질 코드 임시 로그인
  useEffect(() => {
    const fakeUser = {
      id: 1929,
      email: 'tempojt@naver.com',
      nickname: '오종택2',
      profileImageUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const fakeAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyOSwidGVhbUlkIjoiMTQtMiIsImlhdCI6MTc0OTA0NTkwNiwiZXhwIjoxNzQ5MDQ3NzA2LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.xuQkhJT22BfX9kgrCqEo3RyrlQhzUUl80CVC6kejj2w';
    const fakeRefreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyOSwidGVhbUlkIjoiMTQtMiIsImlhdCI6MTc0OTA0NTkwNiwiZXhwIjoxNzUwMjU1NTA2LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.6fmN1poBwLV0N6BxmQuOO-4bA1vvKfhM8cjSE6tAX-A';
    setAuth(fakeUser, fakeAccessToken, fakeRefreshToken);
  }, [setAuth]);
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
    [string],
    number | undefined
  >({
    queryKey: ['activities'],
    queryFn: ({ pageParam = undefined }) => getMyActivities(pageParam),
    getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
  });

  useEffect(() => {
    if (data) {
      console.log('불러온 activity 데이터:', data);
    }
  }, [data]);

  const observerRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center justify-between mb-6 ml-4 mr-4">
        <h1 className="text-3xl-bold mb-6 ml-4">내 체험 관리</h1>
        <Link href="/profile/activities/new">
          <button className="absolute cursor-pointer top-[180px] right-[280px] bg-green-500 hover:bg-green-300 text-white text-md-medium px-4 py-2 shadow">
            체험 등록하기
          </button>
        </Link>
      </div>
      <div className="grid gap-6">
        {data?.pages.map(page =>
          page.activities.map((activity: ActivityBasicDto) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              img={activity.bannerImageUrl}
              price={activity.price}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              userId={1929}
              id={activity.id}
            />
          )),
        )}
      </div>

      <div ref={observerRef} style={{ height: 1 }} />
      {isFetchingNextPage && <div>로딩 중...</div>}
    </div>
  );
}
