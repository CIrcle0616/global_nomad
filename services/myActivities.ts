import { fetchWrapper } from './fetchWrapper';

// 내 체험 리스트 조회
export function getMyActivities(teamId: string, cursorId?: number, size?: number) {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
  });
  return fetchWrapper(`/${teamId}/my-activities?${query}`, 'GET');
}

// 내 체험 월별 예약 현황 조회
export function getMyReservationBoard(teamId: string, activityId: number, year: string, month: string) {
  const query = new URLSearchParams({
    year,
    month,
  });
  return fetchWrapper(`/${teamId}/my-activities/${activityId}/reservation-dashboard?${query}`, 'GET');
}

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케쥴 조회
export function getMyReservedSchedule(teamId: string, activityId: number, date: string) {
  const query = new URLSearchParams({
    date,
  });
  return fetchWrapper(`/${teamId}/my-activities/${activityId}/reserved-schedule?${query}`, 'GET');
}

// 내 체험 예약 시간대별 예약 내역 조회
export function getMyReservations(
  teamId: string,
  activityId: number,
  scheduleId: number,
  status: string,
  cursorId?: number,
  size?: number,
) {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
    scheduleId: String(scheduleId),
    status,
  });
  return fetchWrapper(`/${teamId}/my-activities/${activityId}/reservations?${query}`, 'GET');
}

// 내 체험 예약 상태(승인, 거절) 업데이트
export function patchMyReservations(
  teamId: string,
  activityId: number,
  reservationId: number,
  body: { status: string },
) {
  return fetchWrapper(`/${teamId}/my-activities/${activityId}/reservations/${reservationId}`, 'PATCH', body);
}

// 내 체험 삭제
export function delMyActivities(teamId: string, activityId: number) {
  return fetchWrapper(`/${teamId}/my-activities/${activityId}`, 'DELETE');
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
) {
  return fetchWrapper(`/${teamId}/my-activities/${activityId}`, 'PATCH', body);
}
