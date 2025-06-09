import {
  CreateMyReservationReviewSuccessResponse,
  GetMyReservationsSuccessResponse,
  UpdateMyReservationSuccessResponse,
} from '@/types/domain/myReservations/types';
import { fetchWrapper } from './fetchWrapper';

// 내 예약 리스트 조회
export function getMyReservations(
  { cursorId, size, status }: { cursorId?: number; size?: number; status?: string } = {},
  accessToken?: string,
): Promise<GetMyReservationsSuccessResponse> {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
    ...(status ? { status } : {}),
  }).toString();

  return fetchWrapper<GetMyReservationsSuccessResponse>(`/my-reservations?${query}`, 'GET', undefined, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 내 예약 수정(취소)
export function patchMyReservations(
  { reservationId, body }: { reservationId: number; body: { status: 'canceled' } },
  accessToken?: string,
): Promise<UpdateMyReservationSuccessResponse> {
  return fetchWrapper<UpdateMyReservationSuccessResponse>(`/my-reservations/${reservationId}`, 'PATCH', body, {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  });
}

// 내 예약 리뷰 작성
export function postMyReservations(
  { reservationId, body }: { reservationId: number; body: { rating: number; content: string } },
  accessToken?: string,
): Promise<CreateMyReservationReviewSuccessResponse> {
  return fetchWrapper<CreateMyReservationReviewSuccessResponse>(
    `/my-reservations/${reservationId}/reviews`,
    'POST',
    body,
    {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  );
}
