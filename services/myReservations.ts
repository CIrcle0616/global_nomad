import {
  CreateMyReservationReviewSuccessResponse,
  GetMyReservationsSuccessResponse,
  UpdateMyReservationSuccessResponse,
} from '@/types/domain/myReservations/types';
import { fetchWrapper } from './fetchWrapper';

// 내 예약 리스트 조회
export function getMyReservations(
  teamId: string,
  cursorId?: number,
  size?: number,
  status?: string,
): Promise<GetMyReservationsSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
    ...(status ? { status } : {}),
  });

  return fetchWrapper<GetMyReservationsSuccessResponse>(`/${teamId}/my-reservations?${query}`, 'GET');
}

// 내 예약 수정(취소)
export function patchMyReservations(
  teamId: string,
  reservationId: number,
  body: { status: 'canceled' },
): Promise<UpdateMyReservationSuccessResponse> {
  return fetchWrapper<UpdateMyReservationSuccessResponse>(`/${teamId}/my-reservations/${reservationId}`, 'PATCH', body);
}

// 내 예약 리뷰 작성
export function postMyReservations(
  teamId: string,
  reservationId: number,
  body: { rating: number; content: string },
): Promise<CreateMyReservationReviewSuccessResponse> {
  return fetchWrapper<CreateMyReservationReviewSuccessResponse>(
    `/${teamId}/my-reservations/${reservationId}/reviews`,
    'POST',
    body,
  );
}
