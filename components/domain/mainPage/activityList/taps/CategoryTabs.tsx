import { CATEGORIES } from '@/constants/filterOption';
import Link from 'next/link';

interface CategoryTabsProps {
  activeCategory: string | null;
  currentSort: string | null;
}

const linkClasses = `w-20 h-[41px] md:w-[120px] md:h-[58px] px-5 py-3 md:px-[30px] md:py-4 rounded-[15px] whitespace-nowrap border border-green-500 flex items-center justify-center text-lg-medium md:text-2lg-medium`;

export default function CategoryTabs({ activeCategory, currentSort }: CategoryTabsProps) {
  const sortQuery = currentSort ? `&sort=${currentSort}` : '';

  return (
    <nav className="flex w-full overflow-x-auto flex-nowrap gap-[10px] md:gap-[14px] lg:gap-4 scrollbar-hide -mx-4 pl-4 pr-[120px] lg:mx-0 lg:p-0">
      {CATEGORIES.map((category, i) => (
        <Link
          key={i}
          href={`/?category=${category}&sort=${sortQuery}`}
          scroll={false}
          className={`${linkClasses} ${category === activeCategory ? 'bg-green-500 text-white' : ''}`}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
