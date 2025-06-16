'use client';

import { SizeByDeviceType } from '@/hooks/useMainActivityList';
import useMediaQuery from '@/store/useMediaQuery';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface MainPaginationProps {
  totalCount: number | undefined;
}

const arrowClasses =
  'inline-flex w-10 md:w-[55px] h-10 md:h-[55px] border border-gray-300 rounded-2xl items-center justify-center';

export default function MainPagination({ totalCount }: MainPaginationProps) {
  const deviceType = useMediaQuery();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('keyword');
  const [itemsPerPage, setItemsPerPage] = useState<SizeByDeviceType | 16>(SizeByDeviceType[deviceType]);

  if (keyword && deviceType === 'desktop') {
    setItemsPerPage(16);
  }

  if (!totalCount || totalCount === 0) {
    return null;
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const pagesToShow = 5;

  const halfPagesToShow = Math.floor(pagesToShow / 2);

  let startPage = currentPage - halfPagesToShow;
  let endPage = currentPage + halfPagesToShow;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, pagesToShow);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - pagesToShow + 1);
  }

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `?${params.toString()}`;
  };

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
