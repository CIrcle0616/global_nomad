import EmptyState from '@/components/empty/EmptyState';

export default function Page() {
  // 예시 데이터 (API 결과 등으로 대체할 예정)
  const data: unknown[] = [];

  return (
    <div>
      <h1 className="text-3xl-bold mb-6 ml-4">예약 내역</h1>

      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-gray-100 rounded-xl shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}
