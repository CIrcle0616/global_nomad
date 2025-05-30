export default function Page() {
  return (
    <div className="px-4 md:px-6">
      <h1 className="text-3xl-bold mb-6">예약 내역</h1>

      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-gray-100 rounded-xl shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
