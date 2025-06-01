import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';
import Image from 'next/image';

export default function ActivityDetailHeader({ data }: { data: GetActivityDetailSuccessResponse }) {
  return (
    <div className="w-[343px] md:w-full flex flex-col mx-4 mt-4 md:mt-6 md:mx-0">
      <div>
        <div className="text-md-regular text-nomad-black mb-2.5">{data.category}</div>
        <div className="text-2xl-bold md:text-3xl-bold text-nomad-black mb-4">{data.title}</div>
        <div className="flex flex-row gap-3 items-center">
          <div className="flex flex-row items-center gap-1.5">
            <Image src="/ic_star_on.svg" width={16} height={16} alt="별점" />
            <div className="text-md-regular text-black">
              {data.rating.toFixed(1)} ({data.reviewCount})
            </div>
          </div>
          <div className="flex flex-row items-center gap-1.5">
            <Image src="/ic_location.svg" width={16} height={16} alt="지도마커" />
            <div className="text-md-regular text-nomad-black">{data.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
