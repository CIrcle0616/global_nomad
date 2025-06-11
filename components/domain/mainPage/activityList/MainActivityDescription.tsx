import Image from 'next/image';

interface MainActivityDescriptionProps {
  rating: number;
  reviewCount: number;
  title: string;
  formattedPrice: string;
}

export default function MainActivityDescription({
  rating,
  reviewCount,
  title,
  formattedPrice,
}: MainActivityDescriptionProps) {
  return (
    <div className="flex flex-col text-black">
      <div className="flex gap-[5px] items-center text-lg-medium">
        <Image src={'/ic_activity_star.svg'} alt="평점" width={15} height={15} />
        <span>{rating}</span>
        <span className="text-gray-700">{`(${reviewCount})`}</span>
      </div>
      <div className="mt-[10px]">
        <h3 className="text-2lg-semibold md:text-[24px] md:leading-none">{title}</h3>
      </div>
      <div className="flex gap-[5px] items-center mt-[15px]">
        <span className="text-xl-bold md:text-[28px] md:leading-none lg:text-2xl-bold">₩ {formattedPrice}</span>
        <span className="text-gray-900 text-md-regular md:text-[20px] md:leading:none lg:text-xl-regular">/ 인</span>
      </div>
    </div>
  );
}
