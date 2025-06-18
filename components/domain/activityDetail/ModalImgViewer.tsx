'use client';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { useState } from 'react';

interface ModalImageViewerProps {
  images: string[];
  initialIndex?: number;
}

export default function ModalImageViewer({ images, initialIndex = 0 }: ModalImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const { closeModal } = useModalStore();

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black rounded-lg">
      {/* 닫기(X) 버튼 추가 */}
      <button onClick={closeModal} className="absolute top-2 right-2 z-20 p-2">
        <Image src="/ic_close_white.svg" alt="닫기" width={24} height={24} className="bg-gray-500 rounded-lg" />
      </button>

      {/* 이전/다음 버튼 */}
      <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <Image src="/ic_pagination_arrow_left.svg" alt="이전" width={24} height={47} />
      </button>

      <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <Image src="/ic_pagination_arrow_right.svg" alt="다음" width={24} height={47} />
      </button>

      {/* 이미지 */}
      <div className="w-[300px] h-[300px] md:w-[600px] md:h-[450px] lg:w-[800px] lg:h-[600px] relative">
        <Image src={images[currentIndex]} alt="모달 이미지" fill className="object-contain rounded-md" />
      </div>
    </div>
  );
}
