import TabList from './activityList/taps/TabList';
import MainActivityList from './activityList/MainActivityList';

const h2Classes = 'text-[18px] font-bold text-black mt-8 md:text-[36px]';

interface MainPageActivityListSectionProps {
  keyword: string | undefined;
  category: string | undefined;
  totalCount: number | undefined;
}

export default function MainPageActivityListSection({
  keyword,
  category: titleOfList = '⛸️ 모든 체험',
  totalCount,
}: MainPageActivityListSectionProps) {
  return (
    <section>
      {!keyword && (
        <>
          <TabList />
          <h2 className={h2Classes}>{titleOfList}</h2>
        </>
      )}
      <MainActivityList totalCount={totalCount} />
    </section>
  );
}
