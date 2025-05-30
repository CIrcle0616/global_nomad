import { SignInOauthSuccessResponse, SignUpOauthSuccessResponse } from '@/types/domain/oAuth/types';
import { fetchWrapper } from './fetchWrapper';

// 간편 회원가입
export function kakaoSignUp(
  teamId: string,
  provider: 'kakao',
  body: { nickname: string; redirectUri: string; token: string },
): Promise<SignUpOauthSuccessResponse> {
  return fetchWrapper(`/${teamId}/oauth/sign-up/${provider}`, 'POST', body);
}

// 간편 로그인
export function kakaoSignIn(
  teamId: string,
  provider: 'kakao',
  body: { redirectUri: string; token: string },
): Promise<SignInOauthSuccessResponse> {
  return fetchWrapper<SignInOauthSuccessResponse>(`/${teamId}/oauth/sign-in/${provider}`, 'POST', body);
}
