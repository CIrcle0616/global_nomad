import { paths } from '../../api'; // 원본 타입 파일

// ------------------------------------------------------------------
// 1. 내 알림 리스트 조회 (GET /{teamId}/my-notifications)
// Operation ID: FindMyNotifications
// ------------------------------------------------------------------

/**
 * 내 알림 리스트 조회 성공 응답 (200 OK)
 * GET /{teamId}/my-notifications
 */
export type GetMyNotificationsSuccessResponse =
  paths['/{teamId}/my-notifications']['get']['responses']['200']['content']['application/json'];

/**
 * 내 알림 리스트 조회 시 잘못된 요청 에러 응답 (400 Bad Request)
 * GET /{teamId}/my-notifications
 */
export type GetMyNotificationsBadRequestResponse =
  paths['/{teamId}/my-notifications']['get']['responses']['400']['content']['application/json'];

/**
 * 내 알림 리스트 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/my-notifications
 */
export type GetMyNotificationsUnauthorizedResponse =
  paths['/{teamId}/my-notifications']['get']['responses']['401']['content']['application/json'];

// ------------------------------------------------------------------
// 2. 내 알림 삭제 (DELETE /{teamId}/my-notifications/{notificationId})
// Operation ID: Delete (주의: MyActivities의 Delete와 operationId가 동일하므로, paths로 접근하는 것이 명확합니다)
// ------------------------------------------------------------------

/**
 * 내 알림 삭제 성공 응답 (204 No Content)
 * DELETE /{teamId}/my-notifications/{notificationId}
 */
export type DeleteMyNotificationSuccessResponse =
  paths['/{teamId}/my-notifications/{notificationId}']['delete']['responses']['204']; // 204는 content가 없을 수 있음

/**
 * 내 알림 삭제 시 인증 실패 에러 응답 (401 Unauthorized)
 * DELETE /{teamId}/my-notifications/{notificationId}
 */
export type DeleteMyNotificationUnauthorizedResponse =
  paths['/{teamId}/my-notifications/{notificationId}']['delete']['responses']['401']['content']['application/json'];

/**
 * 내 알림 삭제 시 권한 없음 에러 응답 (403 Forbidden)
 * DELETE /{teamId}/my-notifications/{notificationId}
 */
export type DeleteMyNotificationForbiddenResponse =
  paths['/{teamId}/my-notifications/{notificationId}']['delete']['responses']['403']['content']['application/json'];

/**
 * 내 알림 삭제 시 리소스를 찾을 수 없음 에러 응답 (404 Not Found)
 * DELETE /{teamId}/my-notifications/{notificationId}
 */
export type DeleteMyNotificationNotFoundResponse =
  paths['/{teamId}/my-notifications/{notificationId}']['delete']['responses']['404']['content']['application/json'];
