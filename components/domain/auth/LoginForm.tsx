'use client';

import OneButtonModal from '@/components/common/modal/OneButtonModal';
import { HttpError } from '@/constants/utils/errors';
import { loginUser } from '@/services/auth';
import { useModalStore } from '@/store/modalStore';
import { LoginSuccessResponse } from '@/types/domain/auth/types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { openModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({ mode: 'onChange' });

  const loginMutation = useMutation<LoginSuccessResponse, HttpError, LoginInputs>({
    mutationFn: credentials => {
      return loginUser(credentials);
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: error => {
      const { status } = error;
      if (status === 404) {
        openModal(OneButtonModal, {
          content: '존재하지 않는 유저입니다.',
          onConfirm: () => router.push('/'),
        });
      } else {
        openModal(OneButtonModal, {
          content: error.message,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = data => {
    loginMutation.mutate(data);
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const inputStyle = 'w-full px-5 py-4 rounded-md border border-gray-800';
  const normalBorder = 'border-gray-800';
  const errorBorder = 'border-red-500';
  const labelStyle = 'text-lg-regular color-black mb-2';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-7">
        <label htmlFor="email" className={labelStyle}>
          이메일
        </label>
        <input
          className={`${inputStyle} ${errors.email ? errorBorder : normalBorder}`}
          type="text"
          placeholder="이메일을 입력해 주세요"
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '유효한 이메일 주소를 입력해주세요.',
            },
          })}
        />
        {errors.email && <p className="mt-2 pl-2 text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col mb-7">
        <label htmlFor="password" className={labelStyle}>
          비밀번호
        </label>
        <div className="relative">
          <input
            className={`${inputStyle} pr-12 mb-0`}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            {...register('password', {
              required: '비밀번호를 입력해 주세요',
              minLength: { value: 8, message: '8자 이상 입력해주세요' },
            })}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer z-20"
          >
            <Image
              src={showPassword ? '/ic_passwordOn.svg' : '/ic_passwordOff.svg'}
              width={24}
              height={24}
              alt="비밀번호 보기"
            />
          </button>
        </div>
        {errors.password && <p className="mt-2 pl-2 text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <button
          disabled={!isValid || loginMutation.isPending}
          className="w-full rounded-md px-[136px] py-[14px] bg-nomad-black text-white disabled:bg-gray-600 mb-[26px]"
        >
          로그인 하기
        </button>
      </div>
    </form>
  );
}
