'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ModalImageViewerProps {
  images: string[];
  initialIndex?: number; // 처음 보여질 이미지
}

// 이미지 확대 모달
export default function ModalImageViewer({ images, initialIndex = 0 }: ModalImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isHover, setIsHover] = useState(false);

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length); //이미지 순환을 위한 로직
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-black rounded-lg"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        onClick={prevImage}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 ${isHover ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image src="/ic_pagination_arrow_left.svg" alt="이전" width={24} height={47} />
      </button>

      <button
        onClick={nextImage}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 ${isHover ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image src="/ic_pagination_arrow_right.svg" alt="다음" width={24} height={47} />
      </button>

      {/* 이미지 */}
      <div className="w-[300px] h-[300px] md:w-[600px] md:h-[450px] lg:w-[800px] lg:h-[600px] relative">
        <Image src={images[currentIndex]} alt="모달 이미지" fill className="object-contain rounded-md" />
      </div>
    </div>
  );
}
