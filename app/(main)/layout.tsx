import { ReactNode } from 'react';
import GNB from '@/components/common/gnb/Gnb';
import Footer from '@/components/common/Footer';
import ScrollToTopButton from '@/components/common/ScrollTopButton';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GNB />
      <main className="pt-[60px]">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
