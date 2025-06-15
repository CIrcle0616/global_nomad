'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import useLogin from '@/hooks/useLogin';
import FormInput from './FormInput';

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginInputs> = data => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        register={register}
        error={errors.email}
      />

      <FormInput
        id="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        error={errors.password}
      />

      <div>
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full rounded-md px-[136px] py-[14px] bg-nomad-black text-white disabled:bg-gray-600 mb-[26px]"
        >
          {isLoading ? '로그인 중...' : '로그인 하기'}
        </button>
      </div>
    </form>
  );
}
