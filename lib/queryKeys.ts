import { ActivitySearchParams } from '@/app/(main)/page';

type ActivityListParams = Omit<ActivitySearchParams, 'method' | 'cursorId'>;

export const activitiesKeys = {
  all: ['activities'] as const,
  lists: () => [...activitiesKeys.all, 'list'] as const,

  // 파라미터를 받아 일관된 형식의 쿼리 키를 생성하는 함수
  list: (params: ActivityListParams) => {
    // 이 함수에서 파라미터를 표준화하여 일관성을 보장합니다.
    const searchParams: ActivitySearchParams = {
      method: 'offset',
      size: params.size || 16,
      page: Number(params.page) || 1, // page가 없거나 0이면 기본값 1로 설정
      sort: params.sort || 'latest', // sort가 없으면 기본값 'latest'로 설정 (혹은 undefined)
      category: params.category || undefined,
      keyword: params.keyword || undefined,
    };
    return [...activitiesKeys.lists(), searchParams] as const;
  },

  // 인기 체험 리스트를 위한 키
  popular: () => [...activitiesKeys.all, 'popularList'] as const,
};
