import Image from 'next/image';

export default function EmptyState() {
  return (
    <div className="flex flex-col gap-5 items-center mt-[120px]">
      <Image src="/ic_empty.svg" className="my-[31px] mx-[55px]" width={130} height={177} alt="비어 있는 상태" />
      <p className="text-2xl-medium text-gray-800">아직 등록한 체험이 없어요</p>
    </div>
  );
}
