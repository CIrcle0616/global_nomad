import Link from 'next/link';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12 text-center">
      <div className="mb-3">
        <span className="text-[60px] md:text-[70px] font-extrabold text-gray-800 ">404</span>
      </div>

      <div className="mb-8 w-[260px] h-[260px] relative">
        <Image src="/img_trip.png" alt="비행기와 여권 일러스트" fill className="object-contain animate-float" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">체험을 찾을 수 없습니다.</h2>
      <p className="text-base md:text-lg text-gray-600 mb-6">입력한 주소가 잘못되었거나, 이미 사라진 체험이에요.</p>

      <Link href="/" className="inline-block px-6 py-2 text-white bg-green-900 rounded-md hover:bg-green-700 shadow-md">
        체험하러 가기
      </Link>
    </main>
  );
}
