import { ReactNode } from 'react';
import Gnb from '@/components/gnb/Gnb';
import Footer from '@/components/common/Footer';
import ScrollToTopButton from '@/components/common/ScrollTopButton';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Gnb />
      <main className="pt-[60px]">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
