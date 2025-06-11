import Container from '@/components/common/Container';
import MainPageActivityListSection from '@/components/domain/mainPage/MainPageActivityListSection';
import MainPageBanner from '@/components/domain/mainPage/mainBanner/MainPageBanner';
import SearchBar from '@/components/domain/mainPage/SearchBar';
import { getActivities } from '@/services/activities';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PopularActivitySection from '@/components/domain/mainPage/PopularActivitySection';
import SearchHeader from '@/components/domain/mainPage/SearchHeader';

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

  const { keyword } = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: ['activities', 'popularList'],
    queryFn: () => getActivities({ method: 'offset', sort: 'most_reviewed', size: 3 }),
  });

  const searchResultData = await getActivities({ method: 'offset', keyword });

  const reviewCount = searchResultData.totalCount;

  queryClient.setQueryData(['activities', { keyword }], searchResultData);

  return (
    <main className="w-full h-screen bg-gray-100">
      <MainPageBanner />
      <Container>
        <SearchBar />
        {/* 서버에서 패칭한 데이터를 HydrationBoundary 안에  */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          {keyword ? <SearchHeader keyword={keyword} reviewCount={reviewCount} /> : <PopularActivitySection />}
          <MainPageActivityListSection searchParams={searchParams} />
        </HydrationBoundary>
      </Container>
    </main>
  );
}
