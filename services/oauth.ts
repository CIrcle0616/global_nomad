import { SignInOauthSuccessResponse, SignUpOauthSuccessResponse } from '@/types/domain/oAuth/types';
import { fetchWrapper } from './fetchWrapper';

// 간편 회원가입
export function kakaoSignUp(
  provider: 'kakao',
  body: { nickname: string; redirectUri: string; token: string },
): Promise<SignUpOauthSuccessResponse> {
  return fetchWrapper(`/oauth/sign-up/${provider}`, 'POST', body);
}

// 간편 로그인
export function kakaoSignIn(
  provider: 'kakao',
  body: { redirectUri: string; token: string },
): Promise<SignInOauthSuccessResponse> {
  return fetchWrapper<SignInOauthSuccessResponse>(`/oauth/sign-in/${provider}`, 'POST', body);
}
