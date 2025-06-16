'use client';

import usePagination from '@/hooks/usePagination';
import Link from 'next/link';

interface MainPaginationProps {
  totalCount: number | undefined;
}

const arrowClasses =
  'inline-flex w-10 md:w-[55px] h-10 md:h-[55px] border border-gray-300 rounded-2xl items-center justify-center';

export default function MainPagination({ totalCount }: MainPaginationProps) {
  const pagination = usePagination(totalCount);
  //타입가드
  if (pagination === null) return null;

  const { startPage, endPage, currentPage, totalPages, createPageUrl } = pagination;

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav className="flex justify-center gap-[10px] mt-[38px] col-span-2 md:col-span-3 lg:col-span-4">
      <Link href={createPageUrl(Math.max(startPage - 1, 1))} scroll={false} className={arrowClasses}>
        {'<'}
      </Link>
      {pageNumbers.map(page => (
        <Link
          key={page}
          href={createPageUrl(page)}
          scroll={false}
          className={`inline-flex w-10 md:w-[55px] h-10 md:h-[55px] border border-green-500 ${currentPage === page ? 'text-white bg-green-500' : 'text-green-500'} rounded-2xl items-center justify-center`}
        >
          {page}
        </Link>
      ))}
      <Link href={createPageUrl(Math.min(endPage + 1, totalPages))} scroll={false} className={arrowClasses}>
        {'>'}
      </Link>
    </nav>
  );
}
