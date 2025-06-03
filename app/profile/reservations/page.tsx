import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getMyReservations } from '@/services/myReservations';
import ClientReservations from './ClientReservations';

export default async function ReservationsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myReservations', ''],
    queryFn: () => getMyReservations(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientReservations />
    </HydrationBoundary>
  );
}
