import Image from 'next/image';

interface MainPageActivityImgProps {
  imageUrl: string;
  title?: string;
  className?: string;
}

export default function MainPageActivityImg({ imageUrl, title, className = '' }: MainPageActivityImgProps) {
  return (
    <div className={`relative ${className}`}>
      <Image src={imageUrl} fill alt={title ?? ''} className="object-cover object-center" />;
    </div>
  );
}
