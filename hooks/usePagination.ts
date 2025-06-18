'use client';

import { SizeByDeviceType } from '@/constants/sizeByDeviceType';
import useMediaQuery from '@/store/useMediaQuery';
import { useSearchParams } from 'next/navigation';

export default function usePagination(totalCount: number | undefined) {
  const deviceType = useMediaQuery();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('keyword');

  const itemsPerPage =
    keyword && deviceType !== 'tablet' ? SizeByDeviceType[deviceType] * 2 : SizeByDeviceType[deviceType];

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

  return { createPageUrl, startPage, endPage, currentPage, totalPages };
}
