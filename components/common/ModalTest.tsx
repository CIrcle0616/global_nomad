'use client';

import { useTwoButtonModalStore, useOneButtonModalStore } from '@/store';

export default function ModalTest() {
  const { openModal: openTwoModal } = useTwoButtonModalStore();
  const { openModal: openOneModal } = useOneButtonModalStore();

  function handleSearch() {
    console.log('삭제 기능 실행!');
  }

  const handleOpenTwoButtonModal = () => {
    openTwoModal({
      content: '정말 삭제하시겠습니까?',
      rightButtonText: '삭제',
      leftButtonText: '취소',
      onConfirm: () => handleSearch(),
      onCancel: () => console.log('취소 처리'),
    });
  };

  const handleOpenOneButtonModal = () => {
    openOneModal({
      content: '작업이 완료되었습니다!',
      buttonText: '확인',
    });
  };

  const handleOpenOneButtonModalWithConfirm = () => {
    openOneModal({
      content: '작업이 완료되었습니다!',
      buttonText: '확인',
      onConfirm: () => {
        handleSearch();
      },
    });
  };

  return (
    <div className="flex gap-4">
      <button onClick={handleOpenTwoButtonModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        TwoButtonModal 열기
      </button>

      <button onClick={handleOpenOneButtonModal} className="bg-green-500 text-white px-4 py-2 rounded-md">
        OneButtonModal 열기 (단순)
      </button>

      <button onClick={handleOpenOneButtonModalWithConfirm} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
        OneButtonModal 열기 (함수 실행 포함)
      </button>
    </div>
  );
}
