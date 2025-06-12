'use client';
import { useState, useEffect } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getUserMe, patchUserMe } from '@/services/users';
import { UpdateUserBodyDto } from '@/types';
import { GetMyInfoSuccessResponse } from '@/types/domain/user/types';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Input from '@/components/common/Input';
import CommonButton from '@/components/common/CommonButton';
import ProfileImageUploader from '@/components/common/ProfileImageUploader';

type userInfoInputs = UpdateUserBodyDto & {
  passwordConfirm: string;
};

export default function MyInfoPage() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['myInfo'],
    queryFn: () => {
      return getUserMe();
    },
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<userInfoInputs>({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      newPassword: '',
      passwordConfirm: '',
    },
  });

  const profileInfoMutation = useMutation<GetMyInfoSuccessResponse, Error, UpdateUserBodyDto>({
    mutationFn: profileInfo => {
      return patchUserMe(profileInfo);
    },
    onSuccess: () => {
      alert('내정보가 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit: SubmitHandler<userInfoInputs> = data => {
    const { nickname, newPassword } = data;
    profileInfoMutation.mutate({ nickname, newPassword });
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset({
        nickname: data.nickname,
        newPassword: '',
        passwordConfirm: '',
      });
      setEmail(data.email);
    }
  }, [data, isSuccess, reset]);

  if (isError) {
    console.error('에러 내용:', error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 mb-[120px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl-bold text-black">내 정보</h1>
          <CommonButton size="M" type="submit" width="w-[120px]">
            저장하기
          </CommonButton>
        </div>

        <section className="space-y-6">
          <div className="md:hidden">
            <ProfileImageUploader />
          </div>
          <div>
            <label className="block mb-4 text-2xl-bold text-black" htmlFor="nickname">
              닉네임
            </label>
            <Controller
              name="nickname"
              control={control}
              defaultValue=""
              rules={{
                required: '닉네임을 입력해주세요.',
              }}
              render={({ field }) => (
                <Input
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="닉네임을 입력해주세요."
                  status={{ error: errors.nickname?.message }}
                />
              )}
            />
          </div>

          <div>
            <label className="block mb-4 text-2xl-bold text-black" htmlFor="email">
              이메일
            </label>
            <Input value={email || ''} onChange={handleEmailChange} placeholder="이메일을 입력해주세요." readOnly />
          </div>

          <div>
            <label className="block mb-4 text-2xl-bold text-black" htmlFor="password">
              비밀번호
            </label>
            <Controller
              name="newPassword"
              rules={{
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 8, message: '8자 이상 입력해 주세요.' },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="8자 이상 입력해 주세요."
                  status={{ error: errors.newPassword?.message }}
                />
              )}
            />
          </div>

          <div>
            <label className="block mb-4 text-2xl-bold text-black" htmlFor="confirmPassword">
              비밀번호 재입력
            </label>
            <Controller
              name="passwordConfirm"
              control={control}
              rules={{
                validate: value => value === getValues('newPassword') || '비밀번호가 일치하지 않습니다.',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  status={{ error: errors.passwordConfirm?.message }}
                />
              )}
            />
          </div>
        </section>
      </div>
    </form>
  );
}
