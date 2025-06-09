import DropdownSelect from '@/components/common/DropDownSelect';
import { GetActivityReviewsSuccessResponse } from '@/types/domain/activity/types';
import Image from 'next/image';

export default function ReviewHeader({
  data,
  filter,
  setFilter,
}: {
  data: GetActivityReviewsSuccessResponse;
  filter: string;
  setFilter: (filter: '최신 순' | '별점 높은 순' | '별점 낮은 순') => void;
}) {
  const rating = () => {
    if (data.averageRating > 4) {
      return '매우 만족';
    } else if (data.averageRating > 3) {
      return '만족';
    } else if (data.averageRating > 2) {
      return '보통';
    } else if (data.averageRating > 1) {
      return '불만족';
    } else if (data.averageRating > 0) {
      return '매우 불만족';
    } else {
      return '';
    }
  };

  return (
    <>
      <div className="text-xl-bold text-nomad-black mb-[18px]">후기</div>
      <div className="flex gap-4 items-center">
        <div className="text-[50px] font-semibold text-nomad-black">{data.averageRating.toFixed(1)}</div>
        <div className="flex flex-col gap-1">
          <div className="text-2lg-regular text-nomad-black">{rating()}</div>
          <div className="text-md-regular text-black flex items-center gap-1">
            <Image src="/ic_star_on.svg" width={16} height={16} alt="별점" />
            {data.totalCount.toLocaleString()}개 후기
          </div>
        </div>
        <div className="ml-auto w-[135px] md:w-[160px] text-green-500">
          <DropdownSelect
            onSelect={(value: string) => {
              if (value === '최신 순' || value === '별점 높은 순' || value === '별점 낮은 순') {
                setFilter(value);
              }
            }}
            selected={filter}
            options={['별점 높은 순', '별점 낮은 순', '최신 순']}
            placeholder="필터"
            icon={<Image src="/ic_arrow.svg" alt="필터 아이콘" width={22} height={22} />}
          />
        </div>
      </div>
    </>
  );
}
