'use client';

import clsx from 'clsx';
import React from 'react';

type InputProps = {
  value: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function Input({
  value,
  placeholder = '',
  error,
  hint,
  icon,
  readOnly = false,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="relative w-full max-w-[800px]">
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          placeholder={placeholder}
          style={{ color: 'black' }}
          className={clsx(
            'w-full px-4 py-3 border-[1.6px] rounded-[6px] outline-none transition-all pr-10',
            'placeholder: text-gray-600 text-lg-regular ',
            readOnly && 'cursor-pointer',
            error
              ? 'border-red-500 focus:border-red-500'
              : hint
                ? 'border-green-500 focus:border-green-500'
                : 'border-gray-500 focus:border-black',
          )}
        />

        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
            {icon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-red-500 text-xs-regular">{error}</p>
      ) : hint ? (
        <p className="text-green-500 text-xs-regular">{hint}</p>
      ) : null}
    </div>
  );
}
