'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function Search({ value, onChange, onSubmit }: SearchProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (value.trim() !== '') {
      setIsSubmitted(true);
    }
    onSubmit();
  };

  useEffect(() => {
    if (value.trim() === '') {
      setIsSubmitted(false);
    }
  }, [value]);

  const isTyping = value.trim().length > 0;

  // 입력 중이거나, 포커스 중이거나, 제출된 상태면 라벨을 위로 올림
  const shouldFloatLabel = isFocused || isTyping || isSubmitted;

  const labelPosition = shouldFloatLabel
    ? 'top-[-10px] text-[14px] font-medium'
    : 'top-1/2 -translate-y-1/2 text-[16px]';

  return (
    <div className="w-full flex flex-col items-start px-6 py-4">
      <h2 className="text-[16px] md:text-[20px] lg:text-[20px] font-bold text-black mb-3 md:mb-5 lg:mb-8">
        무엇을 체험하고 싶으신가요?
      </h2>

      <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full max-w-[1152px]">
        <div
          className="relative flex items-center border border-gray-800 rounded-md px-4 h-[56px] flex-1 min-w-0
                    focus-within:ring-[2px] focus-within:ring-nomad-black focus-within:border-transparent transition-all bg-white"
        >
          <Image src="/ic_search.svg" alt="검색 아이콘" width={24} height={24} className="mr-2 z-10" />

          <label
            htmlFor="search-input"
            className={`absolute left-[48px] px-1 bg-white z-10 transition-all duration-200 text-gray-600 pointer-events-none ${labelPosition}`}
          >
            내가 원하는 체험은
          </label>

          <input
            id="search-input"
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
            className="relative z-0 w-full h-full outline-none bg-transparent text-black text-[14px] md:text-[20px] lg:text-[20px] pl-2"
          />
        </div>

        <button
          type="submit"
          className="h-[56px] rounded-md bg-nomad-black hover:bg-green-500 transition-colors duration-300 text-white text-lg-bold w-[96px] sm:w-[136px] md:w-[136px] shrink-0"
        >
          검색하기
        </button>
      </form>
    </div>
  );
}

export default Search;
