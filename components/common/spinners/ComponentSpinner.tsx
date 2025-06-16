'use client';
import Image from 'next/image';

interface ComponentSpinnerProps {
  message?: string; // 표시할 로딩 메시지
  spinnerSize?: number; // 스피너 이미지 크기 px로 지정
  className?: string; // 추가적인 Tailwind 클래스로 스타일링
}

export default function ComponentSpinner({
  message = '데이터를 불러오는 중입니다...',
  spinnerSize = 60,
  className = '',
}: ComponentSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}>
      <Image src="/img_spinner.svg" alt="Loading..." width={spinnerSize} height={spinnerSize} />

      {message && <p className="text-lg-medium text-gray-700">{message}</p>}
    </div>
  );
}
