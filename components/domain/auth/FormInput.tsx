'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

const inputStyle = 'w-full px-5 py-4 rounded-md border border-gray-800';
const normalBorder = 'border-gray-800';
const errorBorder = 'border-red-500';
const labelStyle = 'text-lg-regular color-black mb-2';

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export default function FormInput<T extends FieldValues>({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex flex-col mb-7">
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`${inputStyle} ${error ? errorBorder : normalBorder} ${isPassword ? 'pr-12' : ''}`}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          {...register(id, {})}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer z-20"
            aria-label="비밀번호 보기/숨기기"
          >
            <Image
              src={showPassword ? '/ic_passwordOn.svg' : '/ic_passwordOff.svg'}
              width={24}
              height={24}
              alt="비밀번호 토글 아이콘"
            />
          </button>
        )}
      </div>
      {error && <p className="mt-2 pl-2 text-red-500">{error.message}</p>}
    </div>
  );
}
