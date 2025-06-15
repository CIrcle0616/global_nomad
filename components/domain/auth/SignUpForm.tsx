'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignUp } from '@/hooks/useSignUp';
import FormInput from './FormInput';
import { CreateUserBodyDto } from '@/types';

type SignUpFormInputs = CreateUserBodyDto & {
  passwordConfirm: string;
};

export default function SignUpForm() {
  const { signUp, isLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({ mode: 'onChange' });

  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<SignUpFormInputs> = data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...apiData } = data;
    signUp(apiData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        register={register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '유효한 이메일 주소를 입력해주세요.',
          },
        })}
        error={errors.email}
      />

      <FormInput
        id="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        register={register('nickname', {
          required: '닉네임을 입력해주세요.',
          maxLength: { value: 10, message: '열 자 이하로 작성해주세요.' },
        })}
        error={errors.nickname}
      />

      <FormInput
        id="password"
        label="비밀번호"
        type="password"
        placeholder="8자 이상 입력해 주세요"
        register={register('password', {
          required: '비밀번호를 입력해 주세요.',
          minLength: { value: 8, message: '8자 이상 입력해주세요.' },
        })}
        error={errors.password}
      />

      <FormInput
        id="passwordConfirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        register={register('passwordConfirm', {
          required: '비밀번호를 한번 더 입력해 주세요.',
          validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
        })}
        error={errors.passwordConfirm}
      />

      <div>
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full rounded-md px-[136px] py-[14px] bg-nomad-black text-white disabled:bg-gray-600 mb-[26px]"
        >
          {isLoading ? '처리 중...' : '회원가입 하기'}
        </button>
      </div>
    </form>
  );
}
