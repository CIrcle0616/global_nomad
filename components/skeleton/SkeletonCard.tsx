export default function SkeletonCard() {
  return (
    <div className="animate-pulse flex w-full max-w-full md:max-w-[600px] lg:max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      {/* 이미지 */}
      <div className="flex-shrink-0 w-[128px] md:w-[156px] lg:w-[204px] h-full bg-gray-200" />

      {/* 글 내용 */}
      <div className="flex flex-col justify-center p-4 flex-1 min-w-0 gap-2">
        {/* 상태 표시*/}
        <div className="h-4 w-20 bg-gray-300 rounded" />

        {/* 제목 */}
        <div className="h-6 w-2/3 bg-gray-300 rounded" />

        {/* 날짜, 시간, 인원 */}
        <div className="h-4 w-1/2 bg-gray-300 rounded" />

        {/* 금액 & 버튼 */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-6 w-24 bg-gray-300 rounded" />
          <div className="h-6 w-20 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
