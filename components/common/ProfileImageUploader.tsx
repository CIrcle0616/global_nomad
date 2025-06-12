'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ProfileImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileUrl, setProfileUrl] = useState('/ic_profile.svg');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
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
