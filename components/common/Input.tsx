'use client';

import clsx from 'clsx';
import React from 'react';

type InputProps = {
  type?: 'text' | 'email' | 'password';
  value: string;
  placeholder?: string;
  readOnly?: boolean;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  status?: {
    error?: string;
    hint?: string;
  };
  icon?: {
    element: React.ReactNode;
    onClick?: () => void;
  };
};

export default function Input({
  type = 'text',
  value,
  placeholder = '',

  readOnly = false,
  onChange,
  onBlur,
  status,
  icon,
}: InputProps) {
  const error = status?.error;
  const hint = status?.hint;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="relative">
        <input
          type={type}
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
          <div
            onClick={icon.onClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            {icon.element}
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
