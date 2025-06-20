'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoScriptLoader() {
  const KAKAO_SDK_KEY = 'ee8b727eb9bd5a77a22b851eacd5d101';

  useEffect(() => {
    // Kakao SDK 스크립트가 로드되었는지 확인
    const checkSdkAndInit = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_SDK_KEY);
          console.log('✅ Kakao SDK Initialized via useEffect');
        }
      } else {
        console.log('Waiting for Kakao SDK...');
        setTimeout(checkSdkAndInit, 100);
      }
    };
    checkSdkAndInit();
  }, [KAKAO_SDK_KEY]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=ee8b727eb9bd5a77a22b851eacd5d101&autoload=false&libraries=services`}
        strategy="beforeInteractive"
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js" strategy="beforeInteractive" />
    </>
  );
}
