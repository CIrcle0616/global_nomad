import { ActivitySearchParams } from '@/app/(main)/page';

type ActivityListParams = Omit<ActivitySearchParams, 'method' | 'cursorId'>;

export const queryKeys = {
  user: {
    _def: 'user',
    all: ['user'] as const,
    me: () => [...queryKeys.user.all, 'me'] as const,
  },
  activities: {
    _def: 'activities',
    all: ['activities'] as const,
    lists: () => [...queryKeys.activities.all, 'list'] as const,
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
      return [...queryKeys.activities.lists(), searchParams] as const;
    },
    popularList: () => [...queryKeys.activities.lists(), 'popularList'] as const,
    details: () => [...queryKeys.activities.all, 'detail'] as const,
    detail: (activityId: number) => [...queryKeys.activities.details(), activityId] as const,
    reviews: (activityId: number, params: { page?: number; size?: number }) =>
      [...queryKeys.activities.detail(activityId), 'reviews', params] as const,
    availableSchedules: (activityId: number, year: string, month: string) =>
      [...queryKeys.activities.detail(activityId), 'available-schedule', { year, month }] as const,
  },

  myActivities: {
    _def: 'myActivities',
    all: ['myActivities'] as const,
    lists: () => [...queryKeys.myActivities.all, 'lists'] as const,
    list: (params: { cursorId?: number; size?: number }) => [...queryKeys.myActivities.lists(), params] as const,
    details: () => [...queryKeys.myActivities.all, 'detail'] as const,
    detail: (activityId: number) => [...queryKeys.myActivities.details(), activityId] as const,
    reservationDashboard: (activityId: number, year: string, month: string) =>
      [...queryKeys.myActivities.detail(activityId), 'reservation-dashboard', { year, month }] as const,
    reservedSchedule: (activityId: number, date: string) =>
      [...queryKeys.myActivities.detail(activityId), 'reserved-schedule', { date }] as const,
    reservations: (
      activityId: number,
      body: {
        title: string;
        category: string;
        description: string;
        price: number;
        address: string;
        bannerImageUrl: string;
        subImageIdsToRemove: string[];
        subImageUrlsToAdd: string[];
        scheduleIdsToRemove: number[];
        schedulesToAdd: {
          date: string;
          startTime: string;
          endTime: string;
        }[];
      },
    ) => [...queryKeys.myActivities.detail(activityId), 'reservations', body] as const,
  },
  myReservations: {
    _def: 'myReservations',
    all: ['myReservations'] as const,
    lists: () => [...queryKeys.myReservations.all, 'lists'] as const,
    list: ({ cursorId, size, status }: { cursorId?: number; size?: number; status?: string }) =>
      [...queryKeys.myReservations.lists(), { cursorId, size, status }] as const,
  },

  myNotifications: {
    _def: 'myNotifications',
    all: ['myNotifications'] as const,
    lists: () => [...queryKeys.myNotifications.all, 'list'] as const,
    list: ({ cursorId, size }: { cursorId?: number; size?: number }) =>
      [...queryKeys.myNotifications.lists(), { cursorId, size }] as const,
  },
};

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

export const profileKeys = {
  all: ['profile'] as const,
  info: () => [...profileKeys.all, 'info'] as const,
  activity: (activityId: string) => [...profileKeys.all, 'activity', activityId],
};
