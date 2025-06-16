import Image from 'next/image';

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
    <>
      {totalCount > 0 ? (
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
      ) : (
        <div className="flex flex-col gap-5 items-center mt-[85px]">
          <Image
            src="/ic_empty.svg"
            alt="댓글없음"
            className="md:w-[115px] md:h-[135px] mx-auto"
            width={65}
            height={88}
          />
          <div className="text-xl-medium text-gray-800">아직 등록된 댓글이 없어요</div>
        </div>
      )}
    </>
  );
}
