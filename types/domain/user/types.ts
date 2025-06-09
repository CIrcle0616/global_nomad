import { paths } from '../../api'; // 원본 타입 파일

// ------------------------------------------------------------------
// 1. 회원가입 (POST /{teamId}/users)
// Operation ID: Create (주의: 다른 Create와 operationId가 동일하므로, paths로 접근하는 것이 명확합니다)
// ------------------------------------------------------------------

/**
 * 회원가입 성공 응답 (201 Created)
 * POST /{teamId}/users
 */
export type CreateUserSuccessResponse =
  paths['/{teamId}/users']['post']['responses']['201']['content']['application/json'];

/**
 * 회원가입 시 잘못된 요청 에러 응답 (400 Bad Request)
 * POST /{teamId}/users
 */
export type CreateUserBadRequestResponse =
  paths['/{teamId}/users']['post']['responses']['400']['content']['application/json'];

/**
 * 회원가입 시 중복된 이메일 에러 응답 (409 Conflict)
 * POST /{teamId}/users
 */
export type CreateUserConflictResponse =
  paths['/{teamId}/users']['post']['responses']['409']['content']['application/json'];

// ------------------------------------------------------------------
// 2. 내 정보 조회 (GET /{teamId}/users/me)
// Operation ID: GetMyInfo
// ------------------------------------------------------------------

/**
 * 내 정보 조회 성공 응답 (200 OK)
 * GET /{teamId}/users/me
 */
export type GetMyInfoSuccessResponse =
  paths['/{teamId}/users/me']['get']['responses']['200']['content']['application/json'];

/**
 * 내 정보 조회 시 인증 실패 에러 응답 (401 Unauthorized)
 * GET /{teamId}/users/me
 */
export type GetMyInfoUnauthorizedResponse =
  paths['/{teamId}/users/me']['get']['responses']['401']['content']['application/json'];

/**
 * 내 정보 조회 시 존재하지 않는 유저 에러 응답 (404 Not Found)
 * GET /{teamId}/users/me
 */
export type GetMyInfoNotFoundResponse =
  paths['/{teamId}/users/me']['get']['responses']['404']['content']['application/json'];

// ------------------------------------------------------------------
// 3. 내 정보 수정 (PATCH /{teamId}/users/me)
// Operation ID: UpdateMyInfo
// ------------------------------------------------------------------

/**
 * 내 정보 수정 성공 응답 (200 OK)
 * PATCH /{teamId}/users/me
 */
export type UpdateMyInfoSuccessResponse =
  paths['/{teamId}/users/me']['patch']['responses']['200']['content']['application/json'];

/**
 * 내 정보 수정 시 잘못된 요청 에러 응답 (400 Bad Request)
 * PATCH /{teamId}/users/me
 */
export type UpdateMyInfoBadRequestResponse =
  paths['/{teamId}/users/me']['patch']['responses']['400']['content']['application/json'];

/**
 * 내 정보 수정 시 인증 실패 에러 응답 (401 Unauthorized)
 * PATCH /{teamId}/users/me
 */
export type UpdateMyInfoUnauthorizedResponse =
  paths['/{teamId}/users/me']['patch']['responses']['401']['content']['application/json'];

// ------------------------------------------------------------------
// 4. 프로필 이미지 URL 생성 (POST /{teamId}/users/me/image)
// Operation ID: UploadProfileImage
// ------------------------------------------------------------------

/**
 * 프로필 이미지 URL 생성 성공 응답 (201 Created)
 * POST /{teamId}/users/me/image
 */
export type UploadProfileImageSuccessResponse =
  paths['/{teamId}/users/me/image']['post']['responses']['201']['content']['application/json'];

/**
 * 프로필 이미지 URL 생성 시 인증 실패 에러 응답 (401 Unauthorized)
 * POST /{teamId}/users/me/image
 */
export type UploadProfileImageUnauthorizedResponse =
  paths['/{teamId}/users/me/image']['post']['responses']['401']['content']['application/json'];
