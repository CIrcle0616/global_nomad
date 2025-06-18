import Container from '@/components/common/Container';
import MainPageActivityListSection from '@/components/domain/mainPage/MainPageActivityListSection';
import MainPageBanner from '@/components/domain/mainPage/mainBanner/MainPageBanner';
import SearchBar from '@/components/domain/mainPage/SearchBar';
import { getActivities } from '@/services/activities';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PopularActivitySection from '@/components/domain/mainPage/PopularActivitySection';
import SearchHeader from '@/components/domain/mainPage/SearchHeader';
import { activitiesKeys } from '@/lib/queryKeys';

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
  const size = 8;

  const popularListKey = activitiesKeys.popular();
  const mainListKey = activitiesKeys.list({
    keyword,
    category,
    sort,
    page: page ? Number(page) : 1,
    size,
  });

  //API요청에 사용될 파라미터 객체
  const mainListParams = mainListKey[2];

  const [, mainListData] = await Promise.all([
    queryClient.prefetchQuery({
      queryKey: popularListKey,
      queryFn: () => getActivities({ method: 'offset', sort: 'most_reviewed', size: 9 }),
    }),
    queryClient.fetchQuery({ queryKey: mainListKey, queryFn: () => getActivities(mainListParams) }),
  ]);

  const totalCount = mainListData.totalCount;

  return (
    <main className="w-full h-auto min-h-screen bg-gray-100">
      <MainPageBanner />
      <Container>
        <SearchBar />
        {/* 서버에서 패칭한 데이터를 HydrationBoundary 안에  */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          {keyword ? <SearchHeader keyword={keyword} searchResultCount={totalCount} /> : <PopularActivitySection />}
          <MainPageActivityListSection keyword={keyword} category={category} totalCount={totalCount} />
        </HydrationBoundary>
      </Container>
    </main>
  );
}
