import {
  DeleteMyActivitySuccessResponse,
  GetMyActivitiesSuccessResponse,
  GetMyActivityReservationDashboardSuccessResponse,
  GetMyActivityReservationsSuccessResponse,
  GetMyActivityReservedScheduleSuccessResponse,
  UpdateMyActivityReservationStatusSuccessResponse,
  UpdateMyActivitySuccessResponse,
} from '@/types/domain/myActivities/types';
import { fetchWrapper } from './fetchWrapper';

// 내 체험 리스트 조회
export function getMyActivities(
  teamId: string,
  cursorId?: number,
  size?: number,
): Promise<GetMyActivitiesSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  });
  return fetchWrapper<GetMyActivitiesSuccessResponse>(`/${teamId}/my-activities?${query}`, 'GET');
}

// 내 체험 월별 예약 현황 조회
export function getMyReservationBoard(
  teamId: string,
  activityId: number,
  year: string,
  month: string,
): Promise<GetMyActivityReservationDashboardSuccessResponse> {
  const query = new URLSearchParams({
    year,
    month,
  });
  return fetchWrapper<GetMyActivityReservationDashboardSuccessResponse>(
    `/${teamId}/my-activities/${activityId}/reservation-dashboard?${query}`,
    'GET',
  );
}

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회
export function getMyReservedSchedule(
  teamId: string,
  activityId: number,
  date: string,
): Promise<GetMyActivityReservedScheduleSuccessResponse> {
  const query = new URLSearchParams({
    date,
  });
  return fetchWrapper<GetMyActivityReservedScheduleSuccessResponse>(
    `/${teamId}/my-activities/${activityId}/reserved-schedule?${query}`,
    'GET',
  );
}

// 내 체험 예약 시간대별 예약 내역 조회
export function getMyActivityReservations(
  teamId: string,
  activityId: number,
  scheduleId: number,
  status: string,
  cursorId?: number,
  size?: number,
): Promise<GetMyActivityReservationsSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
    scheduleId: String(scheduleId),
    status,
  });
  return fetchWrapper<GetMyActivityReservationsSuccessResponse>(
    `/${teamId}/my-activities/${activityId}/reservations?${query}`,
    'GET',
  );
}

// 내 체험 예약 상태(승인, 거절) 업데이트
export function patchMyActivityReservations(
  teamId: string,
  activityId: number,
  reservationId: number,
  body: { status: string },
): Promise<UpdateMyActivityReservationStatusSuccessResponse> {
  return fetchWrapper<UpdateMyActivityReservationStatusSuccessResponse>(
    `/${teamId}/my-activities/${activityId}/reservations/${reservationId}`,
    'PATCH',
    body,
  );
}

// 내 체험 삭제
export function delMyActivities(teamId: string, activityId: number): Promise<DeleteMyActivitySuccessResponse> {
  return fetchWrapper<DeleteMyActivitySuccessResponse>(`/${teamId}/my-activities/${activityId}`, 'DELETE');
}

// 내 체험 수정
export function patchMyActivities(
  teamId: string,
  activityId: number,
  body: {
    title: string;
    category: string;
    description: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    subImageIdsToRemove: [];
    subImageUrlsToAdd: [];
    scheduleIdsToRemove: [];
    schedulesToAdd: [];
  },
): Promise<UpdateMyActivitySuccessResponse> {
  return fetchWrapper<UpdateMyActivitySuccessResponse>(`/${teamId}/my-activities/${activityId}`, 'PATCH', body);
}
