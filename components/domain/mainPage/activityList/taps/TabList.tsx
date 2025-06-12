'use client';

import { useSearchParams } from 'next/navigation';
import CategoryTabs from './CategoryTabs';
import SortDropdown from './SortDropdown';

export default function TabList() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const currentSort = searchParams.get('sort');

  return (
    <header className="flex w-full h-auto mt-10 justify-between relative items-center">
      <CategoryTabs activeCategory={activeCategory} currentSort={currentSort} />
      <div className="flex absolute w-[167px] right-0 justify-end bg-gradient-to-l from-[#FAFBFC] via-[#fafbfc] via-70% to-transparent">
        <SortDropdown />
      </div>
    </header>
  );
}
