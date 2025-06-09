import { paths } from '../../api';
// ------------------------------------------------------------------
// 1. 체험 리스트 조회 (GET /{teamId}/activities)
// ------------------------------------------------------------------

/**
 * 체험 리스트 조회 성공 응답 (200 OK)
 * GET /{teamId}/activities
 */
export type GetActivitiesSuccessResponse =
  paths['/{teamId}/activities']['get']['responses']['200']['content']['application/json'];

/**
 * 체험 리스트 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/activities
 */
export type GetActivitiesBadRequestResponse =
  paths['/{teamId}/activities']['get']['responses']['400']['content']['application/json'];

// ------------------------------------------------------------------
// 2. 체험 등록 (POST /{teamId}/activities)
// ------------------------------------------------------------------

/**
 * 체험 등록 성공 응답 (201 Created)
 * POST /{teamId}/activities
 */
export type CreateActivitySuccessResponse =
  paths['/{teamId}/activities']['post']['responses']['201']['content']['application/json'];

/**
 * 체험 등록 시 잘못된 요청 에러 응답 (400 Bad Request)
 * POST /{teamId}/activities
 */
export type CreateActivityBadRequestResponse =
  paths['/{teamId}/activities']['post']['responses']['400']['content']['application/json'];

/**
 * 체험 등록 시 인증 실패 에러 응답 (401 Unauthorized)
 * POST /{teamId}/activities
 */
export type CreateActivityUnauthorizedResponse =
  paths['/{teamId}/activities']['post']['responses']['401']['content']['application/json'];

/**
 * 체험 등록 시 충돌 에러 응답 (409 Conflict - 예: 겹치는 시간대)
 * POST /{teamId}/activities
 */
export type CreateActivityConflictResponse =
  paths['/{teamId}/activities']['post']['responses']['409']['content']['application/json'];

// ------------------------------------------------------------------
// 3. 체험 상세 조회 (GET /{teamId}/activities/{activityId})
// ------------------------------------------------------------------

/**
 * 체험 상세 조회 성공 응답 (200 OK)
 * GET /{teamId}/activities/{activityId}
 */
export type GetActivityDetailSuccessResponse =
  paths['/{teamId}/activities/{activityId}']['get']['responses']['200']['content']['application/json'];

/**
 * 체험 상세 조회 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * GET /{teamId}/activities/{activityId}
 */
export type GetActivityDetailNotFoundResponse =
  paths['/{teamId}/activities/{activityId}']['get']['responses']['404']['content']['application/json'];

// ------------------------------------------------------------------
// 4. 체험 예약 가능일 조회 (GET /{teamId}/activities/{activityId}/available-schedule)
// ------------------------------------------------------------------

/**
 * 체험 예약 가능일 조회 성공 응답 (200 OK)
 * GET /{teamId}/activities/{activityId}/available-schedule
 */
export type GetAvailableScheduleSuccessResponse =
  paths['/{teamId}/activities/{activityId}/available-schedule']['get']['responses']['200']['content']['application/json'];

/**
 * 체험 예약 가능일 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/activities/{activityId}/available-schedule
 */
export type GetAvailableScheduleBadRequestResponse =
  paths['/{teamId}/activities/{activityId}/available-schedule']['get']['responses']['400']['content']['application/json'];

/**
 * 체험 예약 가능일 조회 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * GET /{teamId}/activities/{activityId}/available-schedule
 */
export type GetAvailableScheduleNotFoundResponse =
  paths['/{teamId}/activities/{activityId}/available-schedule']['get']['responses']['404']['content']['application/json'];

// ------------------------------------------------------------------
// 5. 체험 리뷰 조회 (GET /{teamId}/activities/{activityId}/reviews)
// ------------------------------------------------------------------

/**
 * 체험 리뷰 조회 성공 응답 (200 OK)
 * GET /{teamId}/activities/{activityId}/reviews
 */
export type GetActivityReviewsSuccessResponse =
  paths['/{teamId}/activities/{activityId}/reviews']['get']['responses']['200']['content']['application/json'];

/**
 * 체험 리뷰 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/activities/{activityId}/reviews
 */
export type GetActivityReviewsBadRequestResponse =
  paths['/{teamId}/activities/{activityId}/reviews']['get']['responses']['400']['content']['application/json'];

/**
 * 체험 리뷰 조회 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * GET /{teamId}/activities/{activityId}/reviews
 */
export type GetActivityReviewsNotFoundResponse =
  paths['/{teamId}/activities/{activityId}/reviews']['get']['responses']['404']['content']['application/json'];

// ------------------------------------------------------------------
// 6. 체험 예약 신청 (POST /{teamId}/activities/{activityId}/reservations)
// ------------------------------------------------------------------

/**
 * 체험 예약 신청 성공 응답 (201 Created)
 * POST /{teamId}/activities/{activityId}/reservations
 */
export type CreateActivityReservationSuccessResponse =
  paths['/{teamId}/activities/{activityId}/reservations']['post']['responses']['201']['content']['application/json'];

/**
 * 체험 예약 신청 시 잘못된 요청 에러 응답 (400 Bad Request)
 * POST /{teamId}/activities/{activityId}/reservations
 */
export type CreateActivityReservationBadRequestResponse =
  paths['/{teamId}/activities/{activityId}/reservations']['post']['responses']['400']['content']['application/json'];

/**
 * 체험 예약 신청 시 인증 실패 에러 응답 (401 Unauthorized)
 * POST /{teamId}/activities/{activityId}/reservations
 */
export type CreateActivityReservationUnauthorizedResponse =
  paths['/{teamId}/activities/{activityId}/reservations']['post']['responses']['401']['content']['application/json'];

/**
 * 체험 예약 신청 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * POST /{teamId}/activities/{activityId}/reservations
 */
export type CreateActivityReservationNotFoundResponse =
  paths['/{teamId}/activities/{activityId}/reservations']['post']['responses']['404']['content']['application/json'];

/**
 * 체험 예약 신청 시 충돌 에러 응답 (409 Conflict)
 * POST /{teamId}/activities/{activityId}/reservations
 */
export type CreateActivityReservationConflictResponse =
  paths['/{teamId}/activities/{activityId}/reservations']['post']['responses']['409']['content']['application/json'];

// ------------------------------------------------------------------
// 7. 체험 이미지 URL 생성 (POST /{teamId}/activities/image)
// ------------------------------------------------------------------

/**
 * 체험 이미지 URL 생성 성공 응답 (201 Created)
 * POST /{teamId}/activities/image
 */
export type UploadActivityImageSuccessResponse =
  paths['/{teamId}/activities/image']['post']['responses']['201']['content']['application/json'];

/**
 * 체험 이미지 URL 생성 시 인증 실패 에러 응답 (401 Unauthorized)
 * POST /{teamId}/activities/image
 */
export type UploadActivityImageUnauthorizedResponse =
  paths['/{teamId}/activities/image']['post']['responses']['401']['content']['application/json'];
