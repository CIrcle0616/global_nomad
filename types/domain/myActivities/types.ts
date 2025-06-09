import { paths } from '../../api'; // 원본 타입 파일

// ------------------------------------------------------------------
// 1. 내 체험 리스트 조회 (GET /{teamId}/my-activities)
// Operation ID: FindByUserId
// ------------------------------------------------------------------

/**
 * 내 체험 리스트 조회 성공 응답 (200 OK)
 * GET /{teamId}/my-activities
 */
export type GetMyActivitiesSuccessResponse =
  paths['/{teamId}/my-activities']['get']['responses']['200']['content']['application/json'];

/**
 * 내 체험 리스트 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/my-activities
 */
export type GetMyActivitiesBadRequestResponse =
  paths['/{teamId}/my-activities']['get']['responses']['400']['content']['application/json'];

/**
 * 내 체험 리스트 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/my-activities
 */
export type GetMyActivitiesUnauthorizedResponse =
  paths['/{teamId}/my-activities']['get']['responses']['401']['content']['application/json'];

// ------------------------------------------------------------------
// 2. 내 체험 월별 예약 현황 조회 (GET /{teamId}/my-activities/{activityId}/reservation-dashboard)
// Operation ID: FindReservationsByMonth
// ------------------------------------------------------------------

/**
 * 내 체험 월별 예약 현황 조회 성공 응답 (200 OK)
 * GET /{teamId}/my-activities/{activityId}/reservation-dashboard
 */
export type GetMyActivityReservationDashboardSuccessResponse =
  paths['/{teamId}/my-activities/{activityId}/reservation-dashboard']['get']['responses']['200']['content']['application/json'];

/**
 * 내 체험 월별 예약 현황 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/my-activities/{activityId}/reservation-dashboard
 */
export type GetMyActivityReservationDashboardBadRequestResponse =
  paths['/{teamId}/my-activities/{activityId}/reservation-dashboard']['get']['responses']['400']['content']['application/json'];

/**
 * 내 체험 월별 예약 현황 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/my-activities/{activityId}/reservation-dashboard
 */
export type GetMyActivityReservationDashboardUnauthorizedResponse =
  paths['/{teamId}/my-activities/{activityId}/reservation-dashboard']['get']['responses']['401']['content']['application/json'];

/**
 * 내 체험 월별 예약 현황 조회 시 권한 없음 에러 응답 (403 Forbidden)
 * GET /{teamId}/my-activities/{activityId}/reservation-dashboard
 */
export type GetMyActivityReservationDashboardForbiddenResponse =
  paths['/{teamId}/my-activities/{activityId}/reservation-dashboard']['get']['responses']['403']['content']['application/json'];

// ------------------------------------------------------------------
// 3. 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 (GET /{teamId}/my-activities/{activityId}/reserved-schedule)
// Operation ID: FindReservedSchedule
// ------------------------------------------------------------------

/**
 * 내 체험 날짜별 예약 정보 스케줄 조회 성공 응답 (200 OK)
 * GET /{teamId}/my-activities/{activityId}/reserved-schedule
 */
export type GetMyActivityReservedScheduleSuccessResponse =
  paths['/{teamId}/my-activities/{activityId}/reserved-schedule']['get']['responses']['200']['content']['application/json'];

/**
 * 내 체험 날짜별 예약 정보 스케줄 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/my-activities/{activityId}/reserved-schedule
 */
export type GetMyActivityReservedScheduleBadRequestResponse =
  paths['/{teamId}/my-activities/{activityId}/reserved-schedule']['get']['responses']['400']['content']['application/json'];

/**
 * 내 체험 날짜별 예약 정보 스케줄 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/my-activities/{activityId}/reserved-schedule
 */
export type GetMyActivityReservedScheduleUnauthorizedResponse =
  paths['/{teamId}/my-activities/{activityId}/reserved-schedule']['get']['responses']['401']['content']['application/json'];

/**
 * 내 체험 날짜별 예약 정보 스케줄 조회 시 권한 없음 에러 응답 (403 Forbidden)
 * GET /{teamId}/my-activities/{activityId}/reserved-schedule
 */
export type GetMyActivityReservedScheduleForbiddenResponse =
  paths['/{teamId}/my-activities/{activityId}/reserved-schedule']['get']['responses']['403']['content']['application/json'];

// ------------------------------------------------------------------
// 4. 내 체험 예약 시간대별 예약 내역 조회 (GET /{teamId}/my-activities/{activityId}/reservations)
// Operation ID: FindReservations (주의: 다른 FindReservations와 구분 필요)
// ------------------------------------------------------------------

/**
 * 내 체험 예약 시간대별 예약 내역 조회 성공 응답 (200 OK)
 * GET /{teamId}/my-activities/{activityId}/reservations
 */
export type GetMyActivityReservationsSuccessResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations']['get']['responses']['200']['content']['application/json'];

/**
 * 내 체험 예약 시간대별 예약 내역 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/my-activities/{activityId}/reservations
 */
export type GetMyActivityReservationsBadRequestResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations']['get']['responses']['400']['content']['application/json'];

/**
 * 내 체험 예약 시간대별 예약 내역 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/my-activities/{activityId}/reservations
 */
export type GetMyActivityReservationsUnauthorizedResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations']['get']['responses']['401']['content']['application/json'];

/**
 * 내 체험 예약 시간대별 예약 내역 조회 시 권한 없음 에러 응답 (403 Forbidden)
 * GET /{teamId}/my-activities/{activityId}/reservations
 */
export type GetMyActivityReservationsForbiddenResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations']['get']['responses']['403']['content']['application/json'];

// ------------------------------------------------------------------
// 5. 내 체험 예약 상태(승인, 거절) 업데이트 (PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId})
// Operation ID: UpdateReservations
// ------------------------------------------------------------------

/**
 * 내 체험 예약 상태 업데이트 성공 응답 (200 OK)
 * PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId}
 */
export type UpdateMyActivityReservationStatusSuccessResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations/{reservationId}']['patch']['responses']['200']['content']['application/json'];

/**
 * 내 체험 예약 상태 업데이트 시 잘못된 요청 에러 응답 (400 Bad Request)
 * PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId}
 */
export type UpdateMyActivityReservationStatusBadRequestResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations/{reservationId}']['patch']['responses']['400']['content']['application/json'];

/**
 * 내 체험 예약 상태 업데이트 시 인증 실패 에러 응답 (401 Unauthorized)
 * PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId}
 */
export type UpdateMyActivityReservationStatusUnauthorizedResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations/{reservationId}']['patch']['responses']['401']['content']['application/json'];

/**
 * 내 체험 예약 상태 업데이트 시 권한 없음 에러 응답 (403 Forbidden)
 * PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId}
 */
export type UpdateMyActivityReservationStatusForbiddenResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations/{reservationId}']['patch']['responses']['403']['content']['application/json'];

/**
 * 내 체험 예약 상태 업데이트 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * PATCH /{teamId}/my-activities/{activityId}/reservations/{reservationId}
 */
export type UpdateMyActivityReservationStatusNotFoundResponse =
  paths['/{teamId}/my-activities/{activityId}/reservations/{reservationId}']['patch']['responses']['404']['content']['application/json'];

// ------------------------------------------------------------------
// 6. 내 체험 삭제 (DELETE /{teamId}/my-activities/{activityId})
// Operation ID: Delete
// ------------------------------------------------------------------

/**
 * 내 체험 삭제 성공 응답 (204 No Content)
 * DELETE /{teamId}/my-activities/{activityId}
 */
export type DeleteMyActivitySuccessResponse =
  paths['/{teamId}/my-activities/{activityId}']['delete']['responses']['204']; // content가 없을 수 있음

/**
 * 내 체험 삭제 시 잘못된 요청 에러 응답 (400 Bad Request)
 * DELETE /{teamId}/my-activities/{activityId}
 */
export type DeleteMyActivityBadRequestResponse =
  paths['/{teamId}/my-activities/{activityId}']['delete']['responses']['400']['content']['application/json'];

/**
 * 내 체험 삭제 시 인증 실패 에러 응답 (401 Unauthorized)
 * DELETE /{teamId}/my-activities/{activityId}
 */
export type DeleteMyActivityUnauthorizedResponse =
  paths['/{teamId}/my-activities/{activityId}']['delete']['responses']['401']['content']['application/json'];

/**
 * 내 체험 삭제 시 권한 없음 에러 응답 (403 Forbidden)
 * DELETE /{teamId}/my-activities/{activityId}
 */
export type DeleteMyActivityForbiddenResponse =
  paths['/{teamId}/my-activities/{activityId}']['delete']['responses']['403']['content']['application/json'];

/**
 * 내 체험 삭제 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * DELETE /{teamId}/my-activities/{activityId}
 */
export type DeleteMyActivityNotFoundResponse =
  paths['/{teamId}/my-activities/{activityId}']['delete']['responses']['404']['content']['application/json'];

// ------------------------------------------------------------------
// 7. 내 체험 수정 (PATCH /{teamId}/my-activities/{activityId})
// Operation ID: Update
// ------------------------------------------------------------------

/**
 * 내 체험 수정 성공 응답 (200 OK)
 * PATCH /{teamId}/my-activities/{activityId}
 */
export type UpdateMyActivitySuccessResponse =
  paths['/{teamId}/my-activities/{activityId}']['patch']['responses']['200']['content']['application/json'];

/**
 * 내 체험 수정 시 잘못된 요청 에러 응답 (400 Bad Request)
 * PATCH /{teamId}/my-activities/{activityId}
 */
export type UpdateMyActivityBadRequestResponse =
  paths['/{teamId}/my-activities/{activityId}']['patch']['responses']['400']['content']['application/json'];

/**
 * 내 체험 수정 시 인증 실패 에러 응답 (401 Unauthorized)
 * PATCH /{teamId}/my-activities/{activityId}
 */
export type UpdateMyActivityUnauthorizedResponse =
  paths['/{teamId}/my-activities/{activityId}']['patch']['responses']['401']['content']['application/json'];

/**
 * 내 체험 수정 시 권한 없음 에러 응답 (403 Forbidden)
 * PATCH /{teamId}/my-activities/{activityId}
 */
export type UpdateMyActivityForbiddenResponse =
  paths['/{teamId}/my-activities/{activityId}']['patch']['responses']['403']['content']['application/json'];

/**
 * 내 체험 수정 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * PATCH /{teamId}/my-activities/{activityId}
 */
export type UpdateMyActivityNotFoundResponse =
  paths['/{teamId}/my-activities/{activityId}']['patch']['responses']['404']['content']['application/json'];

/**
 * 내 체험 수정 시 충돌 에러 응답 (409 Conflict)
 * PATCH /{teamId}/my-activities/{activityId}
 */
export type UpdateMyActivityConflictResponse =
  paths['/{teamId}/my-activities/{activityId}']['patch']['responses']['409']['content']['application/json'];
