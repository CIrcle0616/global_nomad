import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getMyReservations } from '@/services/myReservations';
import ClientReservations from '../../../components/domain/reservation/ClientReservations';

export default async function ReservationsPage() {
  const queryClient = new QueryClient();

  // 서버에서 미리 데이터 패칭
  await queryClient.prefetchQuery({
    queryKey: ['myReservations', ''],
    queryFn: () => getMyReservations(),
  });

  // 클라이언트 상태를 넘겨주기
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientReservations />
    </HydrationBoundary>
  );
}
