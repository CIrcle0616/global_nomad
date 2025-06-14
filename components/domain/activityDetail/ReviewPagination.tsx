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

  return (
    <div className="flex items-center justify-center gap-2.5 w-full mt-4">
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
    </div>
  );
}
