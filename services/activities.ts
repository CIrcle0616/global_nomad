import {
  CreateActivityReservationSuccessResponse,
  CreateActivitySuccessResponse,
  GetActivitiesSuccessResponse,
  GetActivityDetailSuccessResponse,
  GetActivityReviewsSuccessResponse,
  GetAvailableScheduleSuccessResponse,
  UploadActivityImageSuccessResponse,
} from '@/types/domain/activity/types';
import { fetchWrapper } from './fetchWrapper';

// 체험 리스트 조회
export function getActivities(
  {
    method,
    cursorId,
    category,
    keyword,
    sort,
    page,
    size,
  }: {
    method: 'offset' | 'cursor';
    cursorId?: number;
    category?: string;
    keyword?: string;
    sort?: string;
    page?: number;
    size?: number;
  },
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<GetActivitiesSuccessResponse> {
  const query = new URLSearchParams({
    method,
    ...(cursorId !== undefined ? { cursorId: String(cursorId) } : {}),
    ...(category ? { category } : {}),
    ...(keyword ? { keyword } : {}),
    ...(sort ? { sort } : {}),
    ...(page ? { page: String(page) } : {}),
    ...(size ? { size: String(size) } : {}),
  }).toString();

  return fetchWrapper<GetActivitiesSuccessResponse>(`/activities?${query}`, 'GET', undefined, {
    // ★ 2. 헤더 주입 로직 추가
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 체험 등록 (인증 필요)
export function postActivities(
  body: {
    title: string;
    category: string;
    description: string;
    address: string;
    price: number;
    schedules: {
      date: string;
      startTime: string;
      endTime: string;
    }[];
    bannerImageUrl: string;
    subImageUrls: string[];
  },
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<CreateActivitySuccessResponse> {
  console.log('🔥 postActivities 호출됨'); // ← 이 줄 추가
  console.log('보내는 데이터', body); // ← 이 줄도 추가하면 확인 쉬움

  return fetchWrapper<CreateActivitySuccessResponse>('/activities', 'POST', body, {
    // ★ 2. 헤더 주입 로직 추가
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 체험 상세 조회
export function getActivitiesId(
  activityId: number,
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<GetActivityDetailSuccessResponse> {
  return fetchWrapper<GetActivityDetailSuccessResponse>(`/activities/${activityId}`, 'GET', undefined, {
    // ★ 2. 헤더 주입 로직 추가
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 체험 예약 가능일 조회
export function getAvailableSchedule(
  { activityId, year, month }: { activityId: number; year: string; month: string },
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<GetAvailableScheduleSuccessResponse> {
  const query = new URLSearchParams({ year, month }).toString();
  return fetchWrapper<GetAvailableScheduleSuccessResponse>(
    `/activities/${activityId}/available-schedule?${query}`,
    'GET',
    undefined,
    {
      // ★ 2. 헤더 주입 로직 추가
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 체험 리뷰 조회
export function getReviews(
  { activityId, page, size }: { activityId: number; page?: number; size?: number },
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<GetActivityReviewsSuccessResponse> {
  const query = new URLSearchParams({
    ...(page ? { page: String(page) } : {}),
    ...(size ? { size: String(size) } : {}),
  }).toString();

  return fetchWrapper<GetActivityReviewsSuccessResponse>(
    `/activities/${activityId}/reviews?${query}`,
    'GET',
    undefined,
    {
      // ★ 2. 헤더 주입 로직 추가
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 체험 예약 신청 (인증 필요)
export function postActivityReservation(
  { activityId, body }: { activityId: number; body: { scheduleId: number; headCount: number } },
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<CreateActivityReservationSuccessResponse> {
  return fetchWrapper<CreateActivityReservationSuccessResponse>(
    `/activities/${activityId}/reservations`,
    'POST',
    body,
    {
      // ★ 2. 헤더 주입 로직 추가
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 체험 이미지 url 생성 (인증 필요)
export function postActivityImg(
  image: File,
  accessToken?: string, // ★ 1. 선택적 accessToken 인자 추가
): Promise<UploadActivityImageSuccessResponse> {
  const formData = new FormData();
  formData.append('image', image);

  return fetchWrapper<UploadActivityImageSuccessResponse>('/activities/image', 'POST', formData, {
    // ★ 2. 헤더 주입 로직 추가
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}
