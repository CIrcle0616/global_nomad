import { ReactNode } from 'react';
import GNB from '@/components/common/gnb/Gnb';
import Footer from '@/components/common/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GNB />
      {children}
      <Footer />
    </>
  );
}
