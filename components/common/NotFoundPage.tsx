'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/ic_error_sand.png')",
      }}
    >
      <div className="flex items-center justify-center mb-6 text-white drop-shadow-md">
        <span className="text-6xl md:text-8xl font-extrabold">4</span>

        <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] mx-3">
          <Image src="/ic_tube.png" alt="튜브 아이콘" width={80} height={80} className="object-contain" />
        </div>

        <span className="text-6xl md:text-8xl font-extrabold">4</span>
      </div>

      <h2 className="text-2xl-bold md:text-3xl-bold text-nomad-gray drop-shadow-sm mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-md-regular md:text-lg-regular text-gray-800 mb-6">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[120px] md:max-w-[160px]">
        <button
          onClick={() => router.push('/')}
          className="w-full py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-500 transition text-md-bold md:text-lg-bold"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
