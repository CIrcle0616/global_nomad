import Image from 'next/image';
import DropDownActivityDetail from '../activityDetail/DropdownActivityDetail';

interface CardParam {
  title: string;
  img: string;
  price: number;
  rating: number;
  reviewCount: number;
  userId: number;
  id: number;
}

export default function ActivityCard({ title, img, price, rating, reviewCount, userId, id }: CardParam) {
  return (
    <div className="bg-white-800 p-4 rounded-lg shadow-lg w-[344px] h-[128px] md:w-[429px] md:h-[156px] lg:w-[768px] lg:h-[214px]">
      <div className="flex h-full relative">
        <Image
          src={img}
          alt="이미지"
          width={150} // 예시 사이즈
          height={150} // 예시 사이즈
          className="object-cover rounded"
        />
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="text-yellow-500 font-bold text-sm">
              ★ {rating} ({reviewCount})
            </div>
            <div className="font-bold text-lg">{title}</div>
          </div>
        </div>
        <div>
          <DropDownActivityDetail userId={userId} activityId={id} />
        </div>
        <div className="absolute bottom-2 left-2 text-gray-800 font-bold text-sm md:text-base">₩{price} / 인</div>
      </div>
    </div>
  );
}
