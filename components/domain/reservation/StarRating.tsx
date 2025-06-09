import { useState } from 'react';
import Image from 'next/image';

export default function StarRating({
  rating,
  setRating,
  isDisabled,
  size = 56,
}: {
  rating: number;
  setRating: (value: number) => void;
  isDisabled?: boolean;
  size?: number;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-2 mt-10 mb-10 justify-center">
      {[1, 2, 3, 4, 5].map(i => (
        <Image
          key={i}
          src={(hoverRating || rating) >= i ? '/ic_star_yellow.svg' : '/ic_star.svg'}
          alt={`별점 ${i}`}
          width={size}
          height={size}
          onClick={() => !isDisabled && setRating(i)}
          onMouseEnter={() => !isDisabled && setHoverRating(i)}
          onMouseLeave={() => !isDisabled && setHoverRating(0)}
          className={`
            cursor-pointer transition-colors duration-200
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
      ))}
    </div>
  );
}
