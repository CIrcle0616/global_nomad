'use client';

import { getUserMe } from '@/services/users';
import { GetMyInfoSuccessResponse } from '@/types/domain/user/types';
import { useQuery } from '@tanstack/react-query';

export default function OauthHandlerPage() {
  const { data } = useQuery<GetMyInfoSuccessResponse>({
    queryKey: ['users'],
    queryFn: async () => {
      const user = await getUserMe();
      return user;
    },
    retry: 3,
  });

  return <h1>{data?.id}</h1>;
}
