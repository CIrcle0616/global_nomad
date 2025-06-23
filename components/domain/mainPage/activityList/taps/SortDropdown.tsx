import DropdownMenu from '@/components/common/DropDown';
import { isSortOptionKey, SORT_OPTIONS_DICT, SORT_OPTIONS_KEYS } from '@/constants/filterOption';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import Image from 'next/image';

export default function SortDropdown() {
  const updateParams = useUpdateSearchParams();

  const handleSelect = (value: string) => {
    if (!isSortOptionKey(value)) return;

    const newSortValue = SORT_OPTIONS_DICT[value];
    updateParams([{ key: 'sort', value: newSortValue }]);
  };

  return (
    <DropdownMenu
      onSelect={handleSelect}
      options={SORT_OPTIONS_KEYS}
      trigger={
        <button className="flex gap-1 border border-green-500 rounded-[15px] w-[90px] h-[41px] md:w-[120px] md:h-[53px] justify-between items-center px-5 py-[10px] whitespace-nowrap">
          필터 <Image src={'/ic_vector.svg'} width={12} height={7} alt="필터" />
        </button>
      }
    />
  );
}
