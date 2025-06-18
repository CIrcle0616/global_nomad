import Image from 'next/image';
import { components } from '@/types/api';
type Review = components['schemas']['ReviewServiceResponseDto'];

function formatDateUTC(dateString: string) {
  const date = new Date(dateString);

  return `${date.getUTCFullYear()}. ${date.getUTCMonth() + 1}. ${date.getUTCDate()}`;
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      {reviews?.map((review, index) => (
        <div
          key={review.id}
          className={`flex flex-col gap-4 py-6 ${index !== reviews.length - 1 ? 'border-b border-gray-300' : ''}`}
        >
          <div className="flex gap-4">
            <div className="w-[55px] h-[55px] relative shrink-0">
              <Image
                src={review.user.profileImageUrl || '/ic_empty.svg'}
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-[266px] md:w-[368px] lg:w-[792px]">
              <div className="flex flex-col">
                <div className="text-xl-bold text-nomad-black">{review.user.nickname}</div>
                <div className="flex items-center gap-1 text-lg-regular text-gray-600">
                  <div>작성일</div>
                  <div className="border-l border-gray-600 h-3 mx-1" />
                  <div>{formatDateUTC(review.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              {/* 별점만큼 별아이콘/빈별아이콘 반복*/}
              {Array(review.rating)
                .fill(0)
                .map((_, idx) => (
                  <Image key={`full-${idx}`} src="/ic_star_on.svg" alt="full star" width={18} height={18} />
                ))}
              {Array(5 - review.rating)
                .fill(0)
                .map((_, idx) => (
                  <Image key={`empty-${idx}`} src="/ic_star.svg" alt="empty star" width={18} height={18} />
                ))}
            </div>
            <div className="text-lg-medium text-gray-600">{review.rating.toFixed(1)}</div>
          </div>
          <div>{review.content}</div>
          <div className="border-1 border-black"></div>
        </div>
      ))}
    </div>
  );
}
