'use client';
import { useModalStore } from '@/store/modalStore';
import OneButtonModal from './OneButtonModal';
import TwoButtonModal from './TwoButtonModal';

export default function ModalTest() {
  const { openModal, closeModal } = useModalStore();

  const handleConfirm = () => {
    console.log('삭제 클릭');
  };

  const handleCancel = () => {
    console.log('취소 클릭');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl-bold mb-4">모달 테스트</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          openModal(OneButtonModal, {
            content: '정말 삭제할까요?',
            buttonText: '확인',
            onConfirm: () => console.log('OneButtonModal 확인 클릭'),
          })
        }
      >
        OneButtonModal 열기
      </button>

      <button
        onClick={() =>
          openModal(TwoButtonModal, {
            content: '정말 삭제할까요?',
            rightButtonText: '삭제',
            leftButtonText: '취소',
            onConfirm: handleConfirm,
            onCancel: handleCancel,
          })
        }
      >
        TwoButtonModal - 닫기만
      </button>

      <button
        onClick={() =>
          openModal(TwoButtonModal, {
            content: '정말 삭제할까요?',
            rightButtonText: '삭제',
            leftButtonText: '취소',
            onConfirm: () => {
              console.log('삭제 클릭');
              closeModal();
              setTimeout(() => {
                openModal(TwoButtonModal, {
                  content: '다음 TwoButtonModal입니다!',
                  rightButtonText: '계속',
                  leftButtonText: '취소',
                  onConfirm: () => console.log('다음 TwoButtonModal 확인 클릭'),
                  onCancel: () => console.log('다음 TwoButtonModal 취소 클릭'),
                });
              }, 0);
            },
            onCancel: handleCancel,
          })
        }
      >
        TwoButtonModal - 다음 모달도 TwoButtonModal로 열기
      </button>
    </div>
  );
}
