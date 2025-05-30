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

  return fetchWrapper<GetActivitiesSuccessResponse>(`/activities?${query}`, 'GET');
}

// 체험 등록
export function postActivities(body: {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: [{ date: string; startTime: string; endTime: string }];
  bannerImageUrl: string;
  subImageUrls: string[];
}): Promise<CreateActivitySuccessResponse> {
  return fetchWrapper<CreateActivitySuccessResponse>(`/activities`, 'POST', body);
}

// 체험 상세 조회
export function getActivitiesId(activityId: number): Promise<GetActivityDetailSuccessResponse> {
  return fetchWrapper<GetActivityDetailSuccessResponse>(`/activities/${activityId}`, 'GET');
}

// 체험 예약 가능일 조회
export function getAvailableSchedule(
  activityId: number,
  year: string,
  month: string,
): Promise<GetAvailableScheduleSuccessResponse> {
  const query = new URLSearchParams({
    year,
    month,
  });
  return fetchWrapper<GetAvailableScheduleSuccessResponse>(
    `/activities/${activityId}/available-schedule?${query}`,
    'GET',
  );
}

// 체험 리뷰 조회
export function getReviews(
  activityId: number,
  page?: number,
  size?: number,
): Promise<GetActivityReviewsSuccessResponse> {
  const query = new URLSearchParams({
    ...(page ? { page: String(page) } : {}),
    ...(size ? { size: String(size) } : {}),
  });
  return fetchWrapper<GetActivityReviewsSuccessResponse>(`/activities/${activityId}/reviews?${query}`, 'GET');
}

// 체험 예약 신청
export function postActivityReservation(
  activityId: number,
  body: { scheduleId: number; headCount: number },
): Promise<CreateActivityReservationSuccessResponse> {
  return fetchWrapper<CreateActivityReservationSuccessResponse>(`/activities/${activityId}/reservations`, 'POST', body);
}

// 체험 이미지 url 생성
export function postActivityImg(image: File): Promise<UploadActivityImageSuccessResponse> {
  const formData = new FormData();
  formData.append('image', image);

  return fetchWrapper<UploadActivityImageSuccessResponse>(`/activities/image`, 'POST', formData);
}
