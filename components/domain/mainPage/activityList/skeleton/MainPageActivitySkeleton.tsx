export default function MainPageActivitySkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="rounded-[20px] w-full h-auto aspect-square bg-gray-200" />
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          <div className="h-5 w-1/4 bg-gray-200 rounded" />
          <div className="h-5 w-1/4 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-full bg-gray-200 rounded" />
        <div className="h-7 w-1/2 bg-gray-200 rounded mt-2" />
      </div>
    </div>
  );
}
