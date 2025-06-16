import '@/app/globals.css';
import GlobalModal from '@/components/common/modal/GlobalModal';
import { ReactNode } from 'react';
import { Providers } from '../lib/provider';
import GNB from '@/components/common/gnb/Gnb';
import Footer from '@/components/common/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
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
