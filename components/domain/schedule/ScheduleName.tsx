'use client';

import DropdownSelect from '@/components/common/DropDownSelect';
import arrowIcon from '@/public/ic_arrow.svg';
import Image from 'next/image';

interface ScheduleNameProps {
  activityList: { id: number; title: string }[];
  selectedId: number;
  onSelectedId: (id: number) => void;
}

export default function ScheduleName({ activityList, selectedId, onSelectedId }: ScheduleNameProps) {
  const selectedName = activityList.find(a => a.id === selectedId)?.title ?? '';

  return (
    <div className="w-full">
      <DropdownSelect
        type="list"
        selected={selectedName}
        onSelect={name => {
          const selected = activityList.find(a => a.title === name);
          if (selected) {
            onSelectedId(selected.id);
          }
        }}
        options={activityList.map(a => a.title)}
        placeholder="체험을 선택해주세요."
        icon={<Image src={arrowIcon} alt="드롭다운" />}
      />
    </div>
  );
}
