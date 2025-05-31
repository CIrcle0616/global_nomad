import '@/app/globals.css';
import GlobalModal from '@/components/common/GlobalModal';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
      <GlobalModal />
    </html>
  );
}
