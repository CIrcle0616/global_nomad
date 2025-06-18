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
  { cursorId, size }: { cursorId?: number; size?: number },
  accessToken?: string,
): Promise<GetMyActivitiesSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  }).toString();
  return fetchWrapper<GetMyActivitiesSuccessResponse>(`/my-activities?${query}`, 'GET', undefined, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 내 체험 월별 예약 현황 조회
export function getMyReservationBoard(
  { activityId, year, month }: { activityId: number; year: string; month: string },
  accessToken?: string,
): Promise<GetMyActivityReservationDashboardSuccessResponse> {
  const query = new URLSearchParams({ year, month }).toString();
  return fetchWrapper<GetMyActivityReservationDashboardSuccessResponse>(
    `/my-activities/${activityId}/reservation-dashboard?${query}`,
    'GET',
    undefined,
    {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회
export function getMyReservedSchedule(
  { activityId, date }: { activityId: number; date: string },
  accessToken?: string,
): Promise<GetMyActivityReservedScheduleSuccessResponse> {
  const query = new URLSearchParams({ date }).toString();
  return fetchWrapper<GetMyActivityReservedScheduleSuccessResponse>(
    `/my-activities/${activityId}/reserved-schedule?${query}`,
    'GET',
    undefined,
    {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 내 체험 예약 시간대별 예약 내역 조회
export function getMyActivityReservations(
  {
    activityId,
    scheduleId,
    status,
    cursorId,
    size,
  }: {
    activityId: number;
    scheduleId: number;
    status: string;
    cursorId?: number;
    size?: number;
  },
  accessToken?: string,
): Promise<GetMyActivityReservationsSuccessResponse> {
  const query = new URLSearchParams({
    scheduleId: String(scheduleId),
    status,
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  }).toString();
  return fetchWrapper<GetMyActivityReservationsSuccessResponse>(
    `/my-activities/${activityId}/reservations?${query}`,
    'GET',
    undefined,
    {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 내 체험 예약 상태(승인, 거절) 업데이트
export function patchMyActivityReservations(
  {
    activityId,
    reservationId,
    body,
  }: {
    activityId: number;
    reservationId: number;
    body: { status: string };
  },
  accessToken?: string,
): Promise<UpdateMyActivityReservationStatusSuccessResponse> {
  return fetchWrapper<UpdateMyActivityReservationStatusSuccessResponse>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    'PATCH',
    body,
    {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}

// 내 체험 삭제
export function delMyActivities(activityId: number, accessToken?: string): Promise<DeleteMyActivitySuccessResponse> {
  return fetchWrapper<DeleteMyActivitySuccessResponse>(`/my-activities/${activityId}`, 'DELETE', undefined, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 내 체험 수정
export function patchMyActivities(
  {
    activityId,
    body,
  }: {
    activityId: number;
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
    };
  },
  accessToken?: string,
): Promise<UpdateMyActivitySuccessResponse> {
  return fetchWrapper<UpdateMyActivitySuccessResponse>(`/my-activities/${activityId}`, 'PATCH', body, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}
