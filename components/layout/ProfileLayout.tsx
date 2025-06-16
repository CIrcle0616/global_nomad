'use client';

import SideProfile from '@/components/layout/SideProfile';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 px-4 md:px-6 pt-10 md:pt-[73px]">
        <div className="w-full max-w-screen-xl mx-auto flex">
          <div className="hidden md:block md:w-[251px] lg:w-[384px] shrink-0">
            <SideProfile />
          </div>

          {/* 오른쪽 메인 콘텐츠 */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
