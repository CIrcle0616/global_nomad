import { GetActivityReviewsSuccessResponse } from '@/types/domain/activity/types';
import Image from 'next/image';

export default function ReviewHeader({ data }: { data: GetActivityReviewsSuccessResponse }) {
  const rating = () => {
    if (data.averageRating > 4) {
      return '매우 만족';
    } else if (data.averageRating > 3) {
      return '만족';
    } else if (data.averageRating > 2) {
      return '보통';
    } else if (data.averageRating > 1) {
      return '불만족';
    } else if (data.averageRating > 0) {
      return '매우 불만족';
    } else {
      return '';
    }
  };

  return (
    <>
      <div className="text-xl-bold text-nomad-black mb-[18px]">후기</div>
      <div className="flex gap-4 items-center">
        <div className="text-[50px] font-semibold text-nomad-black">{data.averageRating.toFixed(1)}</div>
        <div className="flex flex-col gap-2">
          <div className="text-2lg-regular text-nomad-black">{rating()}</div>
          <div className="text-md-regular text-black flex items-center gap-1">
            <Image src="/ic_star_on.svg" className="size-4" alt="별점" />
            {data.totalCount.toLocaleString()}개 후기
          </div>
        </div>
      </div>
    </>
  );
}
