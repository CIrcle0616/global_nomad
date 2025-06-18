import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileLayout from '@/components/layout/ProfileLayout';
import { getUserMe } from '@/services/users';

export default async function ProfileSectionLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myInfo'],
    queryFn: () => getUserMe(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileLayout>{children}</ProfileLayout>
    </HydrationBoundary>
  );
}
