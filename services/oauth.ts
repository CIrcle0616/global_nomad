import { fetchWrapper } from './fetchWrapper';

// 간편 회원가입
export function kakaoSignUp(provider: 'kakao', body: { nickname: string; redirectUri: string; token: string }) {
  return fetchWrapper(`/oauth/sign-up/${provider}`, 'POST', body);
}

// 간편 로그인
export function kakaoSignIn(provider: 'kakao', body: { redirectUri: string; token: string }) {
  return fetchWrapper(`/oauth/sign-in/${provider}`, 'POST', body);
}
