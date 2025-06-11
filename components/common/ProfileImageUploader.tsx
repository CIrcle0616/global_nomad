'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postProfileIm, getUserMe, patchUserMe } from '@/services/users';
import OneButtonModal from './modal/OneButtonModal';
import { useModalStore } from '@/store/modalStore';

export default function ProfileImageUploader() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileUrl, setProfileUrl] = useState('/ic_profile.svg');
  const { openModal } = useModalStore();

  const { data: myInfoData } = useQuery({
    queryKey: ['myInfo'],
    queryFn: () => {
      return getUserMe();
    },
  });

  useEffect(() => {
    if (!myInfoData) return;
    if (myInfoData.profileImageUrl) {
      setProfileUrl(myInfoData.profileImageUrl);
    }
  }, [myInfoData]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfileUrl(previewUrl);

      try {
        const uploadResult = await postProfileIm(file);
        const uploadImageUrl = uploadResult.profileImageUrl;
        await patchUserMe({ profileImageUrl: uploadImageUrl });
        await queryClient.invalidateQueries({ queryKey: ['myInfo'] });

        openModal(OneButtonModal, {
          content: '프로필 이미지가 수정되었습니다.',
          onConfirm: () => {},
        });
      } catch (error) {
        console.error(error);
        openModal(OneButtonModal, {
          content: '업로드 중 오류가 발생했습니다.',
          onConfirm: () => {},
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-[160px] h-[160px] mb-3">
        <Image src={profileUrl} alt="프로필 이미지" fill className="rounded-full object-cover" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 w-11 h-11 bg-green-700 rounded-full flex items-center justify-center"
        >
          <Image src="/ic_pen.svg" alt="편집" width={44} height={44} />
        </button>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
      </div>
      <p className="font-semibold text-base">프로필 이미지</p>
    </div>
  );
}
