export default function SkeletonMyInfoForm() {
  return (
    <div className="px-4 mb-[120px] animate-pulse">
      <div className="flex justify-between items-center">
        <div className="w-36 h-10 bg-gray-300 rounded" />
        <div className="w-[120px] h-12  bg-gray-300 rounded" />
      </div>

      <section className="space-y-6">
        <div className="md:hidden w-[160px] h-[160px] bg-gray-200 rounded-full mx-auto" />

        <div className="space-y-5">
          <div className="w-28 h-8 bg-gray-300 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>

        <div className="space-y-5">
          <div className="w-28 h-8 bg-gray-300 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>

        <div className="space-y-5">
          <div className="w-28 h-8 bg-gray-300 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>

        <div className="space-y-5">
          <div className="w-40 h-8 bg-gray-300 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </section>
    </div>
  );
}
