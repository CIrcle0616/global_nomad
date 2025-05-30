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
  teamId: string,
  method: 'offset' | 'cursor',
  cursorId?: number,
  category?: string,
  keyword?: string,
  sort?: string,
  page?: number,
  size?: number,
): Promise<GetActivitiesSuccessResponse> {
  const query = new URLSearchParams({
    method,
    ...(cursorId !== undefined ? { cursorId: String(cursorId) } : {}),
    ...(category ? { category } : {}),
    ...(keyword ? { keyword } : {}),
    ...(sort ? { sort } : {}),
    ...(page ? { page: String(page) } : {}),
    ...(size ? { size: String(size) } : {}),
  });

  return fetchWrapper<GetActivitiesSuccessResponse>(`/${teamId}/activities?${query}`, 'GET');
}

// 체험 등록
export function postActivities(
  teamId: string,
  body: {
    title: string;
    category: string;
    description: string;
    address: string;
    price: number;
    schedules: [{ date: string; startTime: string; endTime: string }];
    bannerImageUrl: string;
    subImageUrls: string[];
  },
): Promise<CreateActivitySuccessResponse> {
  return fetchWrapper<CreateActivitySuccessResponse>(`/${teamId}/activities`, 'POST', body);
}

// 체험 상세 조회
export function getActivitiesId(teamId: string, activityId: number): Promise<GetActivityDetailSuccessResponse> {
  return fetchWrapper<GetActivityDetailSuccessResponse>(`/${teamId}/activities/${activityId}`, 'GET');
}

// 체험 예약 가능일 조회
export function getAvailableSchedule(
  teamId: string,
  activityId: number,
  year: string,
  month: string,
): Promise<GetAvailableScheduleSuccessResponse> {
  const query = new URLSearchParams({
    year,
    month,
  });
  return fetchWrapper<GetAvailableScheduleSuccessResponse>(
    `/${teamId}/activities/${activityId}/available-schedule?${query}`,
    'GET',
  );
}

// 체험 리뷰 조회
export function getReviews(
  teamId: string,
  activityId: number,
  page?: number,
  size?: number,
): Promise<GetActivityReviewsSuccessResponse> {
  const query = new URLSearchParams({
    ...(page ? { page: String(page) } : {}),
    ...(size ? { size: String(size) } : {}),
  });
  return fetchWrapper<GetActivityReviewsSuccessResponse>(`/${teamId}/activities/${activityId}/reviews?${query}`, 'GET');
}

// 체험 예약 신청
export function postActivityReservation(
  teamId: string,
  activityId: number,
  body: { scheduleId: number; headCount: number },
): Promise<CreateActivityReservationSuccessResponse> {
  return fetchWrapper<CreateActivityReservationSuccessResponse>(
    `/${teamId}/activities/${activityId}/reservations`,
    'POST',
    body,
  );
}

// 체험 이미지 url 생성
export function postActivityImg(teamId: string, image: File): Promise<UploadActivityImageSuccessResponse> {
  const formData = new FormData();
  formData.append('image', image);

  return fetchWrapper<UploadActivityImageSuccessResponse>(`/${teamId}/activities/image`, 'POST', formData);
}
