import '@/app/globals.css';
import GlobalModal from '@/components/common/modal/GlobalModal';
import { Providers } from '@/lib/provider';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import KakaoScriptLoader from '@/components/domain/activityDetail/KakaoScriptLoader';

export const metadata: Metadata = {
  title: 'Global Nomad',
  description: '다양한 체험의 판매자와 체험자 모두 될 수 있는 플랫폼',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 스크립트 로직을 담당하는 클라이언트 컴포넌트 */}
        <KakaoScriptLoader />
      </head>
      <body>
        <Providers>
          {children}
          {/* 전역 모달 컴포넌트 위치 */}
          <GlobalModal />
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
