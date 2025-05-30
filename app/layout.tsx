import OneButtonModal from '@/components/common/OneButtonModal';
import '@/app/globals.css';
import { ReactNode } from 'react';
import { Providers } from './provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
          {/* 전역 모달 컴포넌트 위치 */}
          <OneButtonModal />
        </Providers>
      </body>
    </html>
  );
}
