import Container from '@/components/common/Container';
import MainPageActivityListSection from '@/components/domain/mainPage/MainPageActivityListSection';
import MainPageBanner from '@/components/domain/mainPage/mainBanner/MainPageBanner';
import SearchBar from '@/components/domain/mainPage/SearchBar';
import { getActivities } from '@/services/activities';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PopularActivitySection from '@/components/domain/mainPage/PopularActivitySection';
import SearchHeader from '@/components/domain/mainPage/SearchHeader';
import { SizeByDeviceType } from '@/hooks/useMainActivityList';

export interface ActivitySearchParams {
  method: 'offset' | 'cursor';
  cursorId?: number;
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}

interface MainPageProps {
  searchParams: Promise<ActivitySearchParams>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const queryClient = new QueryClient();

  const { keyword, category, sort, page } = await searchParams;

  let pageSize = SizeByDeviceType.desktop;
  if (keyword) {
    pageSize = pageSize * 2;
  }

  const mainListParams: ActivitySearchParams = { method: 'offset', keyword, category, sort, page, size: pageSize };

  const [popularData, mainListData] = await Promise.all([
    getActivities({ method: 'offset', sort: 'most_reviewed', size: 9 }),
    getActivities(mainListParams),
  ]);

  queryClient.setQueryData(['activities', 'popularList'], popularData);
  queryClient.setQueryData(['activities', mainListParams], mainListData);

  const searchResultCount = mainListData.totalCount;

  return (
    <main className="w-full h-auto min-h-screen bg-gray-100">
      <MainPageBanner />
      <Container>
        <SearchBar />
        {/* 서버에서 패칭한 데이터를 HydrationBoundary 안에  */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          {keyword ? (
            <SearchHeader keyword={keyword} searchResultCount={searchResultCount} />
          ) : (
            <PopularActivitySection />
          )}
          <MainPageActivityListSection keyword={keyword} category={category} />
        </HydrationBoundary>
      </Container>
    </main>
  );
}
