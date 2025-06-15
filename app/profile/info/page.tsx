import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getUserMe } from '@/services/users';
import MyInfoForm from '@/components/domain/profile/MyInfoForm';

export default async function MyInfoPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myInfo'],
    queryFn: () => getUserMe(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyInfoForm />;
    </HydrationBoundary>
  );
}
