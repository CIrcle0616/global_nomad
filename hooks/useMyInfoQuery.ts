import { getUserMe } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: () => getUserMe(),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
