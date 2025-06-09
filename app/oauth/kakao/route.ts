import { SignInOauthSuccessResponse } from '@/types/domain/oAuth/types';
import { NextRequest, NextResponse } from 'next/server'; // Next.js 서버 요청 및 응답 객체

//인증 성공 시 처리 함수
function handleAuthSuccess(oAuthData: SignInOauthSuccessResponse, request: NextRequest) {
  const targetUrl = new URL('/oauth/callback/client-processing', request.url);
  const response = NextResponse.redirect(targetUrl);

  // 액세스 토큰 쿠키로 설정
  if (oAuthData.accessToken) {
    response.cookies.set('accessToken', oAuthData.accessToken, {
      httpOnly: true, // JavaScript에서 접근 불가 (XSS 방지)
      secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 HTTPS에서만 전송
      sameSite: 'lax', // CSRF 공격 방지를 위해 'lax' 또는 'strict' 권장
      path: '/', // 웹사이트 전체 경로에서 사용 가능
      maxAge: 60 * 60 * 6, // 쿠키 만료 시간 (6시간)
    });
  }

  // 리프레시 토큰 쿠키로 설정
  if (oAuthData.refreshToken) {
    response.cookies.set('refreshToken', oAuthData.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 60, // 쿠키 만료 시간 (60시간, 예시) - 실제 서비스의 정책에 맞게 설정
    });
  }

  return response;
}

//GET 요청 핸들러 (OAuth 콜백 처리)
//카카오 등 OAuth 제공자로부터 리다이렉트되어 호출됩니다.
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code'); // 'code' 파라미터(카카오로부터 받은 인가 코드) 가져오기
  const redirectUri = process.env.KAKAO_REDIRECT_URL;
  console.log('카카오 OAuth 콜백 실행됨');

  if (!code) {
    return NextResponse.json({ error: '인가 코드가 없습니다' }, { status: 400 });
  }

  try {
    const oAuthResponse = await fetch(process.env.OAUTH_SIGN_IN_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirectUri,
        token: code,
      }),
    });

    // 1-1. 자체 백엔드 로그인 API 호출 성공 시
    if (oAuthResponse.ok) {
      const oAuthData: SignInOauthSuccessResponse = await oAuthResponse.json();
      console.log('카카오 로그인 성공 (자체 백엔드 API)', oAuthData.user);
      return handleAuthSuccess(oAuthData, request);
    } else {
      // 1-2. 자체 백엔드 로그인 API 호출 실패 시 (예: 사용자가 존재하지 않는 경우 - 404)
      const errorStatus = oAuthResponse.status;
      if (errorStatus === 404) {
        console.log('자체 백엔드에 사용자 없음 (404). 카카오 토큰 직접 요청 및 회원가입 시도.');

        // 2. 카카오 OAuth 토큰 직접 요청 (ID 토큰 등 사용자 정보 획득 목적)
        const clientId = process.env.KAKAO_REST_API_KEY;

        const tokenRequestBody = new URLSearchParams({
          /* eslint-disable camelcase */
          grant_type: 'authorization_code',
          client_id: clientId!,
          redirect_uri: redirectUri!,
          code,
        });

        // 카카오 토큰 발급 API 호출
        const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          body: tokenRequestBody.toString(),
        });

        const kakaoData = await tokenResponse.json();
        const { id_token: idToken } = kakaoData;
        const nickname = idToken;

        // 3. 자체 백엔드의 회원가입 API 호출
        const signUpResponse = await fetch(process.env.SIGN_UP_URL!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            redirectUri,
            nickname,
            token: code,
          }),
        });

        // 3-1. 자체 백엔드 회원가입 API 호출 성공 시
        if (signUpResponse.ok) {
          const oAuthData: SignInOauthSuccessResponse = await signUpResponse.json();
          console.log('카카오 회원가입 후 로그인 성공 (자체 백엔드 API)', oAuthData.user);
          return handleAuthSuccess(oAuthData, request);
        }
      }
    }
  } catch (error) {
    // 전체 try-catch 블록에서 발생한 예외 처리
    console.error('카카오 OAuth 콜백 처리 중 에러:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
