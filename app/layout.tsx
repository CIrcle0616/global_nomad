import OneButtonModal from '@/components/common/OneButtonModal';
import TwoButtonModal from '@/components/common/TwoButtonModal';
import '@/app/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <OneButtonModal />
        <TwoButtonModal />
      </body>
    </html>
  );
}
