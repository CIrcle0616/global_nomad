import { fetchWrapper } from './fetchWrapper';

// 내 예약 리스트 조회
export function getMyReservations(cursorId?: number, size?: number, status?: string) {
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    ...(size ? { size: String(size) } : {}),
    ...(status ? { status } : {}),
  });

  return fetchWrapper(`/my-reservations?${query}`, 'GET');
}

// 내 예약 수정(취소)
export function patchMyReservations(reservationId: number, body: { status: 'canceled' }) {
  return fetchWrapper(`/my-reservations/${reservationId}`, 'PATCH', body);
}

// 내 예약 리뷰 작성
export function postMyReservations(reservationId: number, body: { rating: number; content: string }) {
  return fetchWrapper(`/my-reservations/${reservationId}/reviews`, 'POST', body);
}
