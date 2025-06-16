import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';

export default function ActivityDescription({ data }: { data: GetActivityDetailSuccessResponse }) {
  return (
    <>
      <div className="md:border-t md:border-gray-400 md:mb-10 md:w-[469px] lg:w-[614px]"></div>
      <div className="w-[327px] md:w-[455px] lg:w-[614px] mx-auto mt-[15px] md:mt-6">
        <div className="text-xl-bold text-nomad-black mb-4">체험 설명</div>
        <div>{data.description}</div>
      </div>
      <div className="border-t border-gray-400 my-4 md:my-10 md:w-[469px] lg:w-[614px]"></div>
    </>
  );
}
