import { paths } from '../../api'; // 원본 타입 파일

// ------------------------------------------------------------------
// 1. 간편 로그인 App 등록/수정 (POST /{teamId}/oauth/apps)
// Operation ID: UpsertOauthApp
// ------------------------------------------------------------------

/**
 * 간편 로그인 App 등록/수정 성공 응답 (200 OK)
 * POST /{teamId}/oauth/apps
 */
export type UpsertOauthAppSuccessResponse =
  paths['/{teamId}/oauth/apps']['post']['responses']['200']['content']['application/json'];

// ------------------------------------------------------------------
// 2. 간편 회원가입 (POST /{teamId}/oauth/sign-up/{provider})
// Operation ID: SignUpOauth
// ------------------------------------------------------------------

/**
 * 간편 회원가입 성공 응답 (200 OK)
 * POST /{teamId}/oauth/sign-up/{provider}
 */
export type SignUpOauthSuccessResponse =
  paths['/{teamId}/oauth/sign-up/{provider}']['post']['responses']['200']['content']['application/json'];

// ------------------------------------------------------------------
// 3. 간편 로그인 (POST /{teamId}/oauth/sign-in/{provider})
// Operation ID: SignInOauth
// ------------------------------------------------------------------

/**
 * 간편 로그인 성공 응답 (200 OK)
 * POST /{teamId}/oauth/sign-in/{provider}
 */
export type SignInOauthSuccessResponse =
  paths['/{teamId}/oauth/sign-in/{provider}']['post']['responses']['200']['content']['application/json'];
