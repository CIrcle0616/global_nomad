import { ActivitySearchParams } from '@/app/page';
import TabList from './activityList/taps/TabList';
import MainActivityList from './activityList/MainActivityList';

const h2Classes = 'text-[18px] font-bold text-black mt-8 md:text-[36px]';

export default async function MainPageActivityListSection({
  searchParams,
}: {
  searchParams: Promise<ActivitySearchParams>;
}) {
  const { category: titleOfList = '🛼 모든 체험', keyword } = await searchParams;

  return (
    <section>
      {!keyword && (
        <>
          <TabList />
          <h2 className={h2Classes}>{titleOfList}</h2>
        </>
      )}
      <MainActivityList />
    </section>
  );
}
