import '@/app/globals.css';
import GlobalModal from '@/components/common/modal/GlobalModal';
import { ReactNode } from 'react';
import { Providers } from '../lib/provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
          {/* 전역 모달 컴포넌트 위치 */}
          <GlobalModal />
        </Providers>
      </body>
    </html>
  );
}
