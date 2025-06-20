'use client';
import DropdownMenu from '@/components/common/DropDown';
import Image from 'next/image';
import { delMyActivities } from '@/services/myActivities';
import { useRouter, usePathname } from 'next/navigation';
import TwoButtonModal from '@/components/common/modal/TwoButtonModal';
import { useModalStore } from '@/store/modalStore';
import useIsAuthor from '@/hooks/useIsAuthor';

type DropDownActivityDetailProps = {
  userId: number;
  activityId: number;
};

export default function DropDownActivityDetail({ userId, activityId }: DropDownActivityDetailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useModalStore();

  const isAuthor = useIsAuthor(userId);

  if (!isAuthor) {
    return null;
  }

  const handleDeleteActivity = async () => {
    await delMyActivities(activityId);
    const isOnActivityDetailPage = /^\/activities\/\d+$/.test(pathname); //현재 경로가 '/activities/'로 시작하고, 그 뒤에 숫자가 오는 패턴인지 확인
    if (isOnActivityDetailPage) {
      router.back(); // 체험 상세 페이지에 있다면 뒤로 가기
    } else {
      window.location.reload();
    }
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
      trigger={<Image src="/ic_kebab_menu.svg" width={40} height={40} alt="케밥메뉴" loading="eager" />}
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
