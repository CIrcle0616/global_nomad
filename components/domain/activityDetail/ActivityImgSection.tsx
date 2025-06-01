import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';
import Image from 'next/image';

export default function ActivityImgSection({ data }: { data: GetActivityDetailSuccessResponse }) {
  console.log(data.bannerImageUrl);
  return (
    <div className="w-[375px] h-[310px] md:mt-4 relative">
      <Image src={data.bannerImageUrl} alt="활동 이미지" fill />
    </div>
  );
}
