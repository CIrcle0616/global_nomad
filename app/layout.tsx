import '@/app/globals.css';
import GlobalModal from '@/components/common/modal/GlobalModal';
import { Providers } from '@/lib/provider';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
          {/* 전역 모달 컴포넌트 위치 */}
          <GlobalModal />
          <Script
            src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ee8b727eb9bd5a77a22b851eacd5d101&autoload=false&libraries=services"
            strategy="beforeInteractive"
          />
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
