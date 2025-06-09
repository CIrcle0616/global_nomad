'use client';
import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import ModalImageViewer from './ModalImgViewer';

export default function ActivityImgSection({ data }: { data: GetActivityDetailSuccessResponse }) {
  const sliderRef = useRef<HTMLDivElement>(null); // 자동 스크롤을 위한 useRef
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 자동 스크롤 타이머
  const [isHover, setIsHover] = useState(false);
  const { openModal } = useModalStore();

  // 이미지 자동 스크롤
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return undefined;

    // Hover 중에는 슬라이드 멈춤
    if (isHover) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }

    intervalRef.current = setInterval(() => {
      if (!slider) return;

      // 현재 스크롤이 끝에 도달했는지 확인
      const maxScrollLeft = slider.scrollWidth - slider.offsetWidth; //전체 가로길이 - 보이는 길이
      const isAtEnd = Math.ceil(slider.scrollLeft) >= maxScrollLeft;

      if (isAtEnd) {
        // 끝까지 갔으면 처음으로 돌아가기
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // 아니라면 다음으로 스크롤
        slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }; //클린업
  }, [isHover]);

  //왼쪽/오른쪽 버튼 눌렀을때
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-[375px] h-[310px] md:w-[696px] lg:w-[1198px] lg:h-[534px] md:mt-4 md:mb-8 lg:mb-[85px]">
      {/* PC, Tablet: 그리드 뷰 */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 w-full h-full">
        <div
          className="col-span-2 row-span-2 md:hover:scale-[1.02] transition-transform ease-in-out duration-500 cursor-pointer"
          onClick={() =>
            openModal(() => (
              <ModalImageViewer
                images={[data.bannerImageUrl, ...data.subImages.map(img => img.imageUrl)]}
                initialIndex={0}
              />
            ))
          }
        >
          <Image
            src={data.bannerImageUrl}
            alt="활동 대표 이미지"
            width={1600}
            height={900}
            className="object-cover rounded-md"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {data.subImages?.map((img, index) => (
          <div
            key={img.id}
            className="md:hover:scale-[1.03] transition-transform ease-in-out duration-500 cursor-pointer"
            onClick={() =>
              openModal(() => (
                <ModalImageViewer
                  images={[data.bannerImageUrl, ...data.subImages.map(img => img.imageUrl)]}
                  initialIndex={index + 1} // 서브이미지 클릭 시 1부터 시작
                />
              ))
            }
          >
            <Image
              src={img.imageUrl}
              alt="활동 상세 이미지"
              width={800}
              height={800}
              className="object-cover rounded-md"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </div>

      {/* Mobile: 슬라이드 뷰 */}
      <div
        className="block md:hidden relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <button
          onClick={scrollLeft}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-opacity ${isHover ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src="/ic_pagination_arrow_left.svg" alt="이전" width={24} height={47} />
        </button>
        <button
          onClick={scrollRight}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity ${isHover ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src="/ic_pagination_arrow_right.svg" alt="다음" width={24} height={47} />
        </button>
        <div ref={sliderRef} className="overflow-x-auto whitespace-nowrap snap-x snap-mandatory scrollbar-hide">
          <div className="inline-flex gap-2">
            {[data.bannerImageUrl, ...data.subImages.map(img => img.imageUrl)].map((url, idx) => (
              <div key={idx} className="flex-shrink-0 w-[375px] h-[310px] snap-center">
                <Image
                  src={url}
                  alt="활동 이미지"
                  width={1600}
                  height={900}
                  className="object-cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
