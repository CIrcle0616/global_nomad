'use client';

import SideProfile from '@/components/layout/SideProfile';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 md:pt-6 lg:pt-20">
        <div className="w-full max-w-[1440px] mx-auto mt-5 flex px-4 sm:px-6 lg:px-[110px] gap-6">
          <div className="hidden md:block md:w-[251px] lg:w-[384px] shrink-0">
            <SideProfile />
          </div>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
