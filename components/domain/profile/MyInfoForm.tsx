'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { getUserMe, patchUserMe } from '@/services/users';
import { UpdateUserBodyDto } from '@/types';
import { GetMyInfoSuccessResponse } from '@/types/domain/user/types';
import { useModalStore } from '@/store/modalStore';
import Input from '@/components/common/Input';
import CommonButton from '@/components/common/CommonButton';
import ProfileImageUploader from '@/components/common/ProfileImageUploader';
import OneButtonModal from '@/components/common/modal/OneButtonModal';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';

type userInfoInputs = UpdateUserBodyDto & {
  passwordConfirm: string;
};

export default function MyInfoPage() {
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();

  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      openModal(OneButtonModal, {
        content: '내정보가 수정되었습니다.',
        onConfirm: () => {},
      });
    },
    onError: error => {
      console.log(error);
    },
  });

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

  const profileImageMutation = useProfileImageUpload(
    () => {
      openModal(OneButtonModal, {
        content: '프로필 이미지가 변경되었습니다.',
        onConfirm: () => {},
      });
    },
    error => {
      openModal(OneButtonModal, {
        content: `이미지 업로드 실패: ${error.message}`,
        onConfirm: () => {},
      });
    },
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 mb-[120px]">
        <div className="flex justify-between content-center">
          <h1 className="text-3xl-bold text-black">내 정보</h1>
          <CommonButton size="M" type="submit" width="w-[120px]">
            저장하기
          </CommonButton>
        </div>

        <section className="space-y-6">
          <div className="md:hidden">
            <ProfileImageUploader
              onFileSelected={(file: File) => {
                profileImageMutation.mutate(file);
              }}
            />
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
            <Input
              value={email || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return setEmail(e.target.value);
              }}
              placeholder="이메일을 입력해주세요."
              readOnly
            />
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
                  type={showPassword ? 'text' : 'password'}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="8자 이상 입력해 주세요."
                  status={{ error: errors.newPassword?.message }}
                  icon={{
                    element: (
                      <Image
                        src={showPassword ? '/ic_passwordOn.svg' : '/ic_passwordOff.svg'}
                        width={24}
                        height={24}
                        alt="비밀번호 보기"
                      />
                    ),
                    onClick: () => setShowPassword(prev => !prev),
                  }}
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  status={{ error: errors.passwordConfirm?.message }}
                  icon={{
                    element: (
                      <Image
                        src={showConfirmPassword ? '/ic_passwordOn.svg' : '/ic_passwordOff.svg'}
                        width={24}
                        height={24}
                        alt="비밀번호 보기"
                      />
                    ),
                    onClick: () => setShowConfirmPassword(prev => !prev),
                  }}
                />
              )}
            />
          </div>
        </section>
      </div>
    </form>
  );
}
