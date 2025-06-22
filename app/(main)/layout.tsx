import { ReactNode } from 'react';
import Gnb from '@/components/gnb/Gnb';
import Footer from '@/components/common/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Gnb />
      <main className="pt-[60px]">{children}</main>
      <Footer />
    </>
  );
}
