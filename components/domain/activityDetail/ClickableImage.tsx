import Image from 'next/image';

interface ClickableImageProps {
  src: string;
  alt: string;
  index: number;
  onImageClick: (index: number) => void;
  className?: string;
}

/*클릭 가능한 이미지 컴포넌트.*/
export default function ClickableImage({ src, alt, index, onImageClick, className = '' }: ClickableImageProps) {
  return (
    <div
      className={`relative w-full h-full cursor-pointer overflow-hidden rounded-md group ${className}`}
      onClick={() => onImageClick(index)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
