'use client';

import { HttpError } from '@/constants/utils/errors';
import { loginUser } from '@/services/auth';
import { useModalStore } from '@/store/modalStore';
import { LoginSuccessResponse } from '@/types/domain/auth/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OneButtonModal from '@/components/common/modal/OneButtonModal';
import useUserStore from '@/store/useUserStore';

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModalStore();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { setUser } = useUserStore();

  const redirectUrl = searchParams.get('redirect_url');

  useEffect(() => {
    router.prefetch(redirectUrl || '/');
  }, [redirectUrl, router]);

  useEffect(() => {
    if (redirectUrl) {
      openModal(OneButtonModal, {
        content: '로그인이 필요합니다',
      });
    }
  }, [redirectUrl, openModal]);

  const loginMutation = useMutation<LoginSuccessResponse, HttpError, LoginInputs>({
    mutationFn: loginUser,
    onSuccess: data => {
      setIsRedirecting(true);
      router.push(redirectUrl || '/');
      setUser({
        id: data.user.id,
        name: data.user.nickname,
        profileImage: data.user.profileImageUrl ?? undefined,
        teamId: 14 - 3,
        accessToken: data.accessToken,
      });
    },
    onError: error => {
      if (error.status === 404) {
        openModal(OneButtonModal, {
          content: '존재하지 않는 유저입니다.',
          onConfirm: () => router.push('/signup'),
        });
      } else {
        openModal(OneButtonModal, {
          content: error.message || '로그인 중 오류가 발생했습니다.',
        });
      }
    },
  });

  const isLoading = loginMutation.isPending || isRedirecting;

  return {
    login: loginMutation.mutate,
    isLoading,
  };
}
