'use client';
import DropdownMenu from '@/components/common/DropDown';
import Image from 'next/image';
import { delMyActivities } from '@/services/myActivities';
import { useRouter } from 'next/navigation';
import TwoButtonModal from '@/components/common/modal/TwoButtonModal';
import { useModalStore } from '@/store/modalStore';
import useUserStore from '@/store/useUserStore';

type DropDownActivityDetailProps = {
  userId: number;
  activityId: number;
};

export default function DropDownActivityDetail({ userId, activityId }: DropDownActivityDetailProps) {
  const { user } = useUserStore();
  const router = useRouter();
  const { openModal } = useModalStore();

  const isAuthor = user?.id === userId;

  if (!isAuthor) {
    return null;
  }

  const handleDeleteActivity = async () => {
    await delMyActivities(activityId);
    router.refresh(); // 삭제 후 새로고침
  };

  const openDeleteModal = () => {
    openModal(TwoButtonModal, {
      content: '정말 삭제하시겠습니까?',
      onConfirm: async () => {
        await handleDeleteActivity();
        useModalStore.getState().closeModal();
      },
      onCancel: () => {
        useModalStore.getState().closeModal();
      },
    });
  };

  return (
    <DropdownMenu
      onSelect={value => {
        if (value === 'edit') {
          router.push(`/profile/activities/${activityId}/edit`);
        } else if (value === 'delete') {
          openDeleteModal();
        }
      }}
      options={['edit', 'delete']}
      trigger={<Image src="/ic_kebab_menu.svg" width={40} height={40} alt="케밥메뉴" />}
    >
      {option => {
        if (option === 'edit') {
          return '수정하기';
        } else if (option === 'delete') {
          return '삭제하기';
        }
        return null;
      }}
    </DropdownMenu>
  );
}
