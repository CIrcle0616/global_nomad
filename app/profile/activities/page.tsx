'use client';

import { useAuthStore } from '@/store/useAuthStore';
import GetActivityFunction from './MyActivityList';
import ActivityCard from '@/components/domain/activity/ActivityCard';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ActivityBasicDto } from '@/types';

export default function ActivityManagePage() {
  const authStore = useAuthStore();

  useEffect(() => {
    const fakeUser = {
      id: 1907,
      email: 'tempojt@naver.com',
      nickname: '오종택',
      profileImageUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const fakeAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkwNywidGVhbUlkIjoiMTQtMyIsImlhdCI6MTc0ODc2MTE5MiwiZXhwIjoxNzQ4NzYyOTkyLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.7izPQVqTaMHMJA5HAEveL4KSfdhxk98tUFAGnS2nhm4';
    const fakeRefreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkwNywidGVhbUlkIjoiMTQtMyIsImlhdCI6MTc0ODc2MTE5MiwiZXhwIjoxNzQ5OTcwNzkyLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.m558KPdlR3b81RZkM_faxS-hThXQjHYK4r0kQ9lL13Q';
    authStore.setAuth(fakeUser, fakeAccessToken, fakeRefreshToken);
  }, [authStore]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['activities'],
    queryFn: ({ pageParam = 1 }) => GetActivityFunction(pageParam),
    getNextPageParam: last => (last.page < last.totalPages ? last.page + 1 : undefined),
    initialPageParam: 1,
  });

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
      <h1 className="text-3xl-bold mb-6 ml-4">내 체험 관리</h1>
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
            />
          )),
        )}
      </div>
      <div ref={observerRef} style={{ height: 1 }} />
      {isFetchingNextPage && <div>로딩 중...</div>}
    </div>
  );
}
