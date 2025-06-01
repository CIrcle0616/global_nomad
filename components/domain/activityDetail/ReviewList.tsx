import { GetActivityReviewsSuccessResponse } from '@/types/domain/activity/types';
import Image from 'next/image';

function formatDateUTC(dateString: string) {
  const date = new Date(dateString);

  return `${date.getUTCFullYear()}. ${date.getUTCMonth() + 1}. ${date.getUTCDate()}`;
}

export default function ReviewList({ data }: { data: GetActivityReviewsSuccessResponse }) {
  return (
    <div className="my-6">
      {data.reviews?.map(review => (
        <div key={review.id} className="flex gap-4">
          <div className="size-[45px]">
            <Image
              src={review.user.profileImageUrl || '/ic_empty.svg'}
              alt="Profile"
              className="size-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-[266px] md:w-[368px] lg:w-[792px]">
            <div className="flex gap-2">
              <div className="text-lg-bold text-nomad-black">{review.user.nickname}</div>
              <div className="border-x border-nomad-black my-[7px]" />
              <div className="text-lg-regular text-gray-600">{formatDateUTC(review.updatedAt)}</div>
            </div>
            <div>{review.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
