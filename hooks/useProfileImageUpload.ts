import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postProfileIm, patchUserMe } from '@/services/users';
import { GetMyInfoSuccessResponse } from '@/types/domain/user/types';

export function useProfileImageUpload(successCallback?: () => void, errorCallback?: (err: Error) => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation<GetMyInfoSuccessResponse, Error, File>({
    mutationFn: async (file: File) => {
      const { profileImageUrl } = await postProfileIm(file);
      return patchUserMe({ profileImageUrl });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      if (successCallback) successCallback();
    },
    onError: error => {
      if (errorCallback) errorCallback(error);
    },
  });

  return mutation;
}
