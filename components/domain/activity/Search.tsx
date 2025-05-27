'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Search 컴포넌트에서 사용할 props 타입 정의
interface SearchProps {
  value: string; // 입력 필드에 표시할 값 (외부 상태)
  onChange: (value: string) => void; // 입력 값이 변경될 때 호출되는 함수
  onSubmit: () => void; // 검색 버튼 클릭 또는 Enter 시 호출되는 함수
}

// value 이름을 그대로 사용하는 깔끔한 버전
function Search({ value, onChange, onSubmit }: SearchProps) {
  const [isSubmitted, setIsSubmitted] = useState(false); // 라벨 상태 관리

  // 엔터 키나 버튼 클릭 시 검색 동작 처리
  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (value.trim() !== '') {
      setIsSubmitted(true); // 라벨을 위로 고정시키기 위해 상태 변경
      onSubmit(); // 상위 컴포넌트의 검색 함수 호출
    }
  };

  // 입력값이 비워질 경우 라벨 위치를 초기화
  useEffect(() => {
    if (value.trim() === '') {
      setIsSubmitted(false);
    }
  }, [value]);

  // 현재 입력 중인지 여부
  const isTyping = value.trim().length > 0;

  // 라벨 표시 여부: 입력 중이 아니거나 제출 상태일 때만 보임
  const showLabel = (!isTyping && !isSubmitted) || isSubmitted;

  // 라벨 위치 스타일 클래스 정의
  const labelPosition = isSubmitted ? 'top-[-10px] text-[14px] font-medium' : 'top-1/2 -translate-y-1/2 text-[16px]';

  return (
    <div className="w-full flex flex-col items-start px-4">
      {/* 질문 문구 */}
      <h2 className="text-[16px] md:text-[20px] lg:text-[20px] font-bold text-black mb-3 md:mb-5 lg:mb-8">
        무엇을 체험하고 싶으신가요?
      </h2>

      {/* 검색 입력 폼 */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full max-w-[1152px]">
        <div
          className="relative flex items-center border border-gray-800 rounded-md px-4 h-[56px] flex-1 min-w-0
                    focus-within:ring-[2px] focus-within:ring-nomad-black focus-within:border-transparent transition-all bg-white"
        >
          {/* 검색 아이콘 */}
          <Image src="/ic_search.svg" alt="검색 아이콘" width={24} height={24} className="mr-2 z-10" />

          {/* 라벨: 입력 전 힌트로 사용되며, 입력 시 사라짐 */}
          {showLabel && (
            <label
              className={`absolute left-[48px] px-1 bg-white z-10 transition-all duration-200 text-gray-600 pointer-events-none ${labelPosition}`}
            >
              내가 원하는 체험은
            </label>
          )}

          {/* 입력 필드 */}
          <input
            type="text"
            value={value} // 외부 상태와 연결된 값
            onChange={e => onChange(e.target.value)} // 상위 상태 변경 호출
            onKeyDown={e => {
              if (e.key === 'Enter') handleSubmit(e); // 엔터 키 제출 처리
            }}
            className="w-full h-full outline-none bg-transparent text-black text-[14px] md:text-[20px] lg:text-[20px] pl-2"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="h-[56px] rounded-md bg-nomad-black text-white text-lg-bold w-[96px] sm:w-[136px] md:w-[136px] shrink-0"
        >
          검색하기
        </button>
      </form>
    </div>
  );
}

export default Search;
