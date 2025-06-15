import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useModalStore } from '@/store/modalStore';
import { signUp } from '@/services/users';
import { HttpError } from '@/constants/utils/errors';
import { CreateUserBodyDto } from '@/types';
import OneButtonModal from '@/components/common/modal/OneButtonModal';
import { CreateUserSuccessResponse } from '@/types/domain/user/types';
import { useEffect, useState } from 'react';

export function useSignUp() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    router.prefetch('/login');
  }, [router]);

  const signUpMutation = useMutation<CreateUserSuccessResponse, HttpError, CreateUserBodyDto>({
    mutationFn: signUp,
    onSuccess: () => {
      setIsRedirecting(true);
      openModal(OneButtonModal, {
        content: '가입이 완료되었습니다!',
        onConfirm: () => router.push('/login'),
      });
    },
    onError: error => {
      if (error.status === 409) {
        openModal(OneButtonModal, {
          content: '이미 사용중인 이메일입니다.',
        });
      } else {
        openModal(OneButtonModal, {
          content: error.message || '회원가입 중 오류가 발생했습니다.',
        });
      }
    },
  });

  const isLoading = signUpMutation.isPending || isRedirecting;

  return {
    signUp: signUpMutation.mutate,
    isLoading,
  };
}
