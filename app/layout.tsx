import OneButtonModal from '@/components/common/OneButtonModal';
import '@/app/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        {/* 전역 모달 컴포넌트 위치 */}
        <OneButtonModal />
      </body>
    </html>
  );
}
