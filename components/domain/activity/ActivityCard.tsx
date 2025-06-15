import Image from 'next/image';
import DropDownActivityDetail from '../activityDetail/DropdownActivityDetail';

interface CardParam {
  title: string;
  img: string;
  price: number;
  rating: number;
  reviewCount: number;
  userId: number | null;
  id: number;
}

export default function ActivityCard({ title, img, price, rating, reviewCount, userId, id }: CardParam) {
  return (
    <div className="flex w-full max-w-full md:max-w-[600px] lg:max-w-[792px] h-[128px] md:h-[156px] lg:h-[204px] bg-white rounded-xl shadow-md border border-gray-100 relative overflow-visible">
      <div className="flex-shrink-0 w-[128px] md:w-[156px] lg:w-[204px] h-full relative">
        <Image src={img} alt={title} fill unoptimized className="object-cover rounded-l-xl" />
      </div>

      <div className="flex flex-col justify-between flex-1 px-4 py-3">
        <div>
          <div className="text-yellow-500 font-bold text-sm mb-1">
            ★ {rating} ({reviewCount})
          </div>
          <div className="text-black font-semibold text-md md:text-lg truncate">{title}</div>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="text-black font-bold text-sm md:text-base mt-1">₩{price.toLocaleString()} / 인</div>

          {userId !== null && (
            <div className="self-end">
              <div className="w-[10px] h-[40px] flex items-center justify-center">
                <DropDownActivityDetail userId={userId} activityId={id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
