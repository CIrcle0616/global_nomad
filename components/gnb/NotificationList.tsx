'use client';

import { delMyNotifications, getMyNotifications } from '@/services/myNotifications';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import NotificationCard from './NotificationCard';
import ComponentSpinner from '../common/spinners/ComponentSpinner';

export default function NotificationList() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'approved' | 'rejected'>('all');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['myNotifications'],
    queryFn: ({ pageParam = undefined }: { pageParam?: number }) =>
      getMyNotifications({ cursorId: pageParam, size: 5 }),
    getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
  });

  const delMutation = useMutation({
    mutationFn: (id: number) => delMyNotifications(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myNotifications'] }),
  });

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage || isFetchingNextPage) return;

      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });
      observer.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const allNotifications = data?.pages.flatMap(page => page.notifications) ?? [];
  const filtered = allNotifications.filter(noti => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'approved') return noti.content.includes('승인');
    if (selectedCategory === 'rejected') return noti.content.includes('거절');
    return true;
  });

  return (
    <div className=" bg-[#CDE8D5] w-full h-full sm:w-full sm:h-auto sm:max-h-[400px] overflow-y-auto">
      <div className="p-3 sticky top-0 bg-[#CDE8D5]">
        <div className="flex items-center px-3 py-x">
          <span className="text-xl-bold mt-[5px] mb-[5px]">알림 {filtered.length}개</span>
        </div>
        <div className="flex gap-2 mx-2  mb-2">
          {(['all', 'approved', 'rejected'] as const).map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm transition  ${
                selectedCategory === category ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
          `}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? '전체' : category === 'approved' ? '예약 승인' : '예약 거절'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="space-y-3">
          {filtered.map(noti => (
            <li key={noti.id}>
              <NotificationCard
                id={noti.id}
                content={noti.content}
                createdAt={new Date(noti.createdAt).toLocaleString()}
                type={noti.content.includes('승인') ? 'approved' : noti.content.includes('거절') ? 'rejected' : 'all'}
                onDelete={() => delMutation.mutate(noti.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 mt-2 py-3 text-sm text-gray-500 whitespace-nowrap text-center">알림이 없습니다</div>
      )}

      {isFetchingNextPage && (
        <div className="mt-4 mb-4">
          <ComponentSpinner spinnerSize={30} message="데이터를 불러오는 중입니다..." />
        </div>
      )}
      <div ref={observerRef} className="h-1" />
    </div>
  );
}
