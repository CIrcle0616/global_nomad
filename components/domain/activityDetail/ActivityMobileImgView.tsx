'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ActivityMobileViewProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export default function ActivityMobileView({ images, onImageClick }: ActivityMobileViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 자동 슬라이드 로직
  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  return (
    <div
      className="block md:hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 슬라이더 래퍼 (보여지는 창) */}
      <div className="overflow-hidden w-full">
        {/* 슬라이더 컨테이너 (움직이는 대상) */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((url, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-[310px] cursor-pointer" onClick={() => onImageClick(idx)}>
              <Image
                src={url}
                alt={`활동 이미지 ${idx + 1}`}
                width={375}
                height={310}
                className="w-full h-full object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 p-2">
        <Image src="/ic_pagination_arrow_left.svg" alt="이전" width={24} height={47} />
      </button>
      <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
        <Image src="/ic_pagination_arrow_right.svg" alt="다음" width={24} height={47} />
      </button>
    </div>
  );
}
