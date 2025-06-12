import React from 'react';

// 아이콘이 받을 props 타입을 정의합니다.
interface ChevronIconProps {
  direction?: 'left' | 'right'; // 방향 제어
  color?: string;
  className?: string;
  width?: number; // 너비
  height?: number; // 높이
}

export default function ChevronIcon({
  direction = 'right', // 기본값은 오른쪽
  color = '#4B4B4B', // 기본값은 원래 색상
  className = '',
  width = 44,
  height = 44,
}: ChevronIconProps) {
  // SVG의 transform 속성을 이용해 방향을 뒤집습니다.
  const transform = direction === 'left' ? 'rotate(180deg)' : undefined;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: transform }}
    >
      <path
        d="M16 11L26.2929 21.2929C26.6834 21.6834 26.6834 22.3166 26.2929 22.7071L16 33"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
