'use client';

import { signUp } from '@/services/users';
import { CreateUserBodyDto } from '@/types';
import { CreateUserSuccessResponse } from '@/types/domain/user/types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type SignUpFormInputs = CreateUserBodyDto & {
  passwordConfirm: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({ mode: 'onChange' });

  const passwordValue = watch('password');

  const signUpMutation = useMutation<CreateUserSuccessResponse, Error, CreateUserBodyDto>({
    mutationFn: credentials => {
      return signUp(credentials);
    },
    onSuccess: () => {
      alert('회원가입 성공');
      router.push('/login');
    },
    onError: error => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = data => {
    const { email, nickname, password } = data;
    signUpMutation.mutate({ email, nickname, password });
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const togglePasswordRepeat = () => {
    setShowPasswordConfirm(prev => !prev);
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
        <label htmlFor="nickname" className={labelStyle}>
          닉네임
        </label>
        <input
          className={`${inputStyle} ${errors.nickname ? errorBorder : normalBorder}`}
          type="text"
          placeholder="닉네임을 입력해 주세요"
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            maxLength: { value: 10, message: '열 자 이하로 작성해주세요.' },
          })}
        />
        {errors.nickname && <p className="mt-2 pl-2 text-red-500">{errors.nickname.message}</p>}
      </div>

      <div className="flex flex-col mb-7">
        <label htmlFor="password" className={labelStyle}>
          비밀번호
        </label>
        <div className="relative">
          <input
            className={`${inputStyle} pr-12 mb-0`}
            type={showPassword ? 'text' : 'password'}
            placeholder="8자 이상 입력해 주세요"
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

      <div className="flex flex-col mb-7">
        <label htmlFor="password" className={labelStyle}>
          비밀번호 확인
        </label>
        <div className="relative">
          <input
            className={`${inputStyle} pr-12 mb-0`}
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            {...register('passwordConfirm', {
              required: '비밀번호를 한번 더 입력해 주세요',
              validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
            })}
          />
          <button
            type="button"
            onClick={togglePasswordRepeat}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer z-20"
          >
            <Image
              src={showPasswordConfirm ? '/ic_passwordOn.svg' : '/ic_passwordOff.svg'}
              width={24}
              height={24}
              alt="비밀번호 보기"
            />
          </button>
        </div>
        {errors.passwordConfirm && <p className="mt-2 pl-2 text-red-500">{errors.passwordConfirm.message}</p>}
      </div>

      <div>
        <button
          disabled={!isValid || signUpMutation.isPending}
          className="w-full rounded-md px-[136px] py-[14px] bg-nomad-black text-white disabled:bg-gray-600 mb-[26px]"
        >
          회원가입 하기
        </button>
      </div>
    </form>
  );
}
