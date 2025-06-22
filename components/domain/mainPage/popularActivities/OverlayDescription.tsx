import { ActivityBasicDto } from '@/types';
import Image from 'next/image';

type OverlayDescriptionProps = {
  activity: Pick<ActivityBasicDto, 'title' | 'reviewCount' | 'rating' | 'price'>;
};

export default function OverlayDescription({ activity }: OverlayDescriptionProps) {
  const { rating, reviewCount, title, price } = activity;
  const formattedPrice = price.toLocaleString('ko-kr');

  return (
    <div className="flex flex-col gap-[6px] md:gap-5 absolute left-5 right-5 bottom-6 z-20">
      <div className="flex gap-[5px] items-center text-md-semibold">
        <Image src={'/ic_activity_star.svg'} alt="평점" width={15} height={15} />
        <span>{rating}</span>
        <span>{`(${reviewCount})`}</span>
        <div></div>
      </div>
      <div>
        <h3 className="text-2lg-bold md:text-3xl-bold max-w-[240px]">{title}</h3>
      </div>
      <div className="flex gap-[5px] items-center">
        <span className="text-lg-bold md:text-xl-bold">₩ {formattedPrice}</span>
        <span className="text-gray-700 text-md-regular">/ 인</span>
      </div>
    </div>
  );
}
