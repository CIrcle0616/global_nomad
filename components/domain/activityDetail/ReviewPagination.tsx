export default function ReviewPagination({
  totalCount,
  currentPage,
  onPageChange,
}: {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const reviewsPerPage = 3;
  const totalPage = Math.ceil(totalCount / reviewsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  return (
    <div className="flex items-center justify-center gap-2.5 w-full mt-4">
      {/* 왼쪽 화살표 */}
      <button
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`size-[40px] md:size-[55px] flex items-center justify-center rounded-2xl border text-sm ${
          isFirstPage
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
        }`}
      >
        ◀
      </button>
      {/* 페이지 번호 */}
      {Array.from({ length: totalPage }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`size-[40px] md:size-[55px] px-[14.52px] py-[7px] md:px-[22px] md:py-[14.5px] rounded-2xl border ${
              isActive ? 'bg-green-500 text-white border-green-500' : 'border-green-500'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      {/* 오른쪽 화살표 */}
      <button
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`size-[40px] md:size-[55px] flex  items-center justify-center rounded-2xl border text-sm pl-1 ${
          isLastPage
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
        }`}
      >
        ▶
      </button>
    </div>
  );
}
