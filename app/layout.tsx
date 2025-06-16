import '@/app/globals.css';
import GlobalModal from '@/components/common/modal/GlobalModal';
import { ReactNode } from 'react';
import { Providers } from '../lib/provider';
import Script from 'next/script';
import GNB from '@/components/common/gnb/Gnb';
import Footer from '@/components/common/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ee8b727eb9bd5a77a22b851eacd5d101&autoload=false&libraries=services"
          strategy="beforeInteractive"
        />
      </head>

      <body>
        <Providers>
          <GNB />
          {children}
          {/* 전역 모달 컴포넌트 위치 */}
          <GlobalModal />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
