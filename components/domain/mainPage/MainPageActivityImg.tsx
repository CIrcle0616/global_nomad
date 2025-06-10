import Image from 'next/image';

interface MainPageActivityImgProps {
  imageUrl: string;
  title?: string;
}

export default function MainPageActivityImg({ imageUrl, title }: MainPageActivityImgProps) {
  return (
    <div className="relative w-[186px] h-[186px] md:w-[384px] md:h-[384px]">
      <Image src={imageUrl} fill alt={title ?? ''} className="object-cover object-center" />;
    </div>
  );
}
