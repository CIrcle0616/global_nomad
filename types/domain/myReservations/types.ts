import { paths } from '../../api'; // 원본 타입 파일

// ------------------------------------------------------------------
// 1. 내 예약 리스트 조회 (GET /{teamId}/my-reservations)
// Operation ID: Find (주의: 다른 Find와 operationId가 동일하므로, paths로 접근하는 것이 명확합니다)
// ------------------------------------------------------------------

/**
 * 내 예약 리스트 조회 성공 응답 (200 OK)
 * GET /{teamId}/my-reservations
 */
export type GetMyReservationsSuccessResponse =
  paths['/{teamId}/my-reservations']['get']['responses']['200']['content']['application/json'];

export type Reservation = GetMyReservationsSuccessResponse['reservations'][number];
/**
 * 내 예약 리스트 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/my-reservations
 */
export type GetMyReservationsBadRequestResponse =
  paths['/{teamId}/my-reservations']['get']['responses']['400']['content']['application/json'];

/**
 * 내 예약 리스트 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/my-reservations
 */
export type GetMyReservationsUnauthorizedResponse =
  paths['/{teamId}/my-reservations']['get']['responses']['401']['content']['application/json'];

// ------------------------------------------------------------------
// 2. 내 예약 수정 (취소) (PATCH /{teamId}/my-reservations/{reservationId})
// Operation ID: Update (주의: 다른 Update와 operationId가 동일하므로, paths로 접근하는 것이 명확합니다)
// ------------------------------------------------------------------

/**
 * 내 예약 수정 (취소) 성공 응답 (200 OK)
 * PATCH /{teamId}/my-reservations/{reservationId}
 */
export type UpdateMyReservationSuccessResponse =
  paths['/{teamId}/my-reservations/{reservationId}']['patch']['responses']['200']['content']['application/json'];

/**
 * 내 예약 수정 (취소) 시 잘못된 요청 에러 응답 (400 Bad Request)
 * PATCH /{teamId}/my-reservations/{reservationId}
 */
export type UpdateMyReservationBadRequestResponse =
  paths['/{teamId}/my-reservations/{reservationId}']['patch']['responses']['400']['content']['application/json'];

/**
 * 내 예약 수정 (취소) 시 인증 실패 에러 응답 (401 Unauthorized)
 * PATCH /{teamId}/my-reservations/{reservationId}
 */
export type UpdateMyReservationUnauthorizedResponse =
  paths['/{teamId}/my-reservations/{reservationId}']['patch']['responses']['401']['content']['application/json'];

/**
 * 내 예약 수정 (취소) 시 권한 없음 에러 응답 (403 Forbidden)
 * PATCH /{teamId}/my-reservations/{reservationId}
 */
export type UpdateMyReservationForbiddenResponse =
  paths['/{teamId}/my-reservations/{reservationId}']['patch']['responses']['403']['content']['application/json'];

// ------------------------------------------------------------------
// 3. 내 예약 리뷰 작성 (POST /{teamId}/my-reservations/{reservationId}/reviews)
// Operation ID: CreateReview
// ------------------------------------------------------------------

/**
 * 내 예약 리뷰 작성 성공 응답 (201 Created)
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export type CreateMyReservationReviewSuccessResponse =
  paths['/{teamId}/my-reservations/{reservationId}/reviews']['post']['responses']['201']['content']['application/json'];

/**
 * 내 예약 리뷰 작성 시 잘못된 요청 에러 응답 (400 Bad Request)
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export type CreateMyReservationReviewBadRequestResponse =
  paths['/{teamId}/my-reservations/{reservationId}/reviews']['post']['responses']['400']['content']['application/json'];

/**
 * 내 예약 리뷰 작성 시 인증 실패 에러 응답 (401 Unauthorized)
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export type CreateMyReservationReviewUnauthorizedResponse =
  paths['/{teamId}/my-reservations/{reservationId}/reviews']['post']['responses']['401']['content']['application/json'];

/**
 * 내 예약 리뷰 작성 시 권한 없음 에러 응답 (403 Forbidden)
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export type CreateMyReservationReviewForbiddenResponse =
  paths['/{teamId}/my-reservations/{reservationId}/reviews']['post']['responses']['403']['content']['application/json'];

/**
 * 내 예약 리뷰 작성 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export type CreateMyReservationReviewNotFoundResponse =
  paths['/{teamId}/my-reservations/{reservationId}/reviews']['post']['responses']['404']['content']['application/json'];

/**
 * 내 예약 리뷰 작성 시 충돌 에러 응답 (409 Conflict - 예: 이미 리뷰 작성)
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export type CreateMyReservationReviewConflictResponse =
  paths['/{teamId}/my-reservations/{reservationId}/reviews']['post']['responses']['409']['content']['application/json'];
