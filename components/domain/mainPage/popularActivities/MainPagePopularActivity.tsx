import type { ActivityBasicDto } from '@/types';
import MainPageActivityImg from '../MainPageActivityImg';
import Gradation from './Gradation';
import OverlayDescription from './OverlayDescription';

type MainPageActivityProps = {
  activity: Pick<ActivityBasicDto, 'title' | 'bannerImageUrl' | 'reviewCount' | 'rating' | 'price'>;
};

export default function MainPagePopularActivity({ activity }: MainPageActivityProps) {
  const { title, bannerImageUrl } = activity;

  return (
    <article className="relative rounded-[20px] md:rounded-[24px] overflow-hidden text-white">
      <MainPageActivityImg
        imageUrl={bannerImageUrl}
        title={title}
        className="w-[186px] h-[186px] md:w-[384px] md:h-[384px]"
      />
      <Gradation />
      <OverlayDescription activity={activity} />
    </article>
  );
}
