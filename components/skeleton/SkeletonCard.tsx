export default function SkeletonCard() {
  return (
    <div className="animate-pulse flex w-full max-w-full md:max-w-[600px] lg:max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="flex-shrink-0 w-[128px] md:w-[156px] lg:w-[204px] h-full bg-gray-200" />

      <div className="flex flex-col justify-center p-2 flex-1 min-w-0 space-y-1 md:space-y-2 lg:space-y-3">
        <div className="h-[16px] md:h-[18px] lg:h-[20px] w-[60px] bg-gray-300 rounded" />

        <div className="h-[20px] md:h-[24px] lg:h-[28px] w-2/3 bg-gray-300 rounded" />

        <div className="h-[14px] md:h-[18px] lg:h-[20px] w-1/2 bg-gray-300 rounded" />

        <div className="flex items-center justify-between mt-1 md:mt-2 lg:mt-4">
          <div className="h-[20px] md:h-[24px] lg:h-[28px] w-[100px] bg-gray-300 rounded" />
          <div className="h-[32px] md:h-[40px] lg:h-[43px] w-[80px] md:w-[112px] lg:w-[144px] bg-gray-300 rounded-[6px]" />
        </div>
      </div>
    </div>
  );
}
