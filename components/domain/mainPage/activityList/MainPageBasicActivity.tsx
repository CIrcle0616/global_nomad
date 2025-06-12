import type { ActivityBasicDto } from '@/types';
import MainPageActivityImg from '../MainPageActivityImg';
import MainActivityDescription from './MainActivityDescription';

interface MainPageActivityProps {
  activity: ActivityBasicDto;
}

export default function MainPageBasicActivity({ activity }: MainPageActivityProps) {
  const { title, bannerImageUrl, reviewCount, rating, price } = activity;
  const formattedPrice = price.toLocaleString('ko-kr');

  return (
    <article className="flex flex-col gap-4">
      <MainPageActivityImg
        imageUrl={bannerImageUrl}
        title={title}
        className="rounded-[20px] overflow-hidden w-full h-auto aspect-square"
      />
      <MainActivityDescription
        title={title}
        reviewCount={reviewCount}
        rating={rating}
        formattedPrice={formattedPrice}
      />
    </article>
  );
}
