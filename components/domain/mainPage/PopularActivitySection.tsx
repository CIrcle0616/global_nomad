'use client';

import useMediaQuery from '@/store/useMediaQuery';
import usePopularActivities from '@/hooks/usePopularActivities';
import ListControl from './popularActivities/ListControl';
import PopularActivityList from './popularActivities/PopularActivityList';

export default function PopularActivitySection() {
  const deviceType = useMediaQuery();
  const { activities, currentActivitiesForDesktop, handleNext, handlePrev, isNextDisabled, isPrevDisabled } =
    usePopularActivities();

  const isDesktop = deviceType === 'desktop';

  return (
    <section className="-mt-[36px]">
      <header className="flex mb-4 md:mb-8 justify-between">
        <h2 className="text-[18px] font-bold leading-none md:text-[36px] text-black">&#128293; 인기 체험</h2>
        {isDesktop && (
          <ListControl
            onPrev={handlePrev}
            onNext={handleNext}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
          />
        )}
      </header>
      <PopularActivityList activities={isDesktop ? currentActivitiesForDesktop : activities} />
    </section>
  );
}
