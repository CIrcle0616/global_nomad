import OneButtonModal from '@/components/common/OneButtonModal';
import '@/app/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <OneButtonModal />
      </body>
    </html>
  );
}
