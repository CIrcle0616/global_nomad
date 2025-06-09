import { paths } from '../../api'; // 원본 타입 파일

// ------------------------------------------------------------------
// 1. 로그인 (POST /{teamId}/auth/login)
// Operation ID: Login (paths['/{teamId}/auth/login']['post']는 operations['Login']을 참조)
// ------------------------------------------------------------------

/**
 * 로그인 성공 응답 (201 Created)
 * POST /{teamId}/auth/login
 */
export type LoginSuccessResponse =
  paths['/{teamId}/auth/login']['post']['responses']['201']['content']['application/json'];

/**
 * 로그인 시 잘못된 요청 에러 응답 (400 Bad Request)
 * POST /{teamId}/auth/login
 */
export type LoginBadRequestResponse =
  paths['/{teamId}/auth/login']['post']['responses']['400']['content']['application/json'];

/**
 * 로그인 시 존재하지 않는 유저 에러 응답 (404 Not Found)
 * POST /{teamId}/auth/login
 */
export type LoginNotFoundResponse =
  paths['/{teamId}/auth/login']['post']['responses']['404']['content']['application/json'];

// // 요청 본문 타입 (참고용)
// export type LoginRequestBody =
//   paths['/{teamId}/auth/login']['post']['requestBody']['content']['application/json']; // components['schemas']['LoginBodyDto'] 와 동일

// ------------------------------------------------------------------
// 2. 토큰 재발급 (POST /{teamId}/auth/tokens)
// Operation ID: Refresh (paths['/{teamId}/auth/tokens']['post']는 operations['Refresh']을 참조)
// ------------------------------------------------------------------

/**
 * 토큰 재발급 성공 응답 (201 Created)
 * POST /{teamId}/auth/tokens
 */
export type RefreshTokenSuccessResponse =
  paths['/{teamId}/auth/tokens']['post']['responses']['201']['content']['application/json'];

export type LogoutSuccessResponse = { message: string };
