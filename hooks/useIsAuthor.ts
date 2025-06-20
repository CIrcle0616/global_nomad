import useUserStore from '@/store/useUserStore';

export default function useIsAuthor(targetUserId: number) {
  const { user } = useUserStore();
  const isAuthor = user?.id === targetUserId;
  return isAuthor;
}
