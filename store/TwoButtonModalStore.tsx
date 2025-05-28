import { create } from 'zustand';

interface TwoButtonModalState {
  isOpen: boolean;
  content: string;
  rightButtonText?: string; // 오른쪽 버튼 텍스트
  leftButtonText?: string; // 왼쪽 버튼 텍스트
  onConfirm?: () => void; // 오른쪽 버튼 클릭 시 처리
  onCancel?: () => void; // 왼쪽 버튼 클릭 시 처리
  openModal: (payload: {
    content: string;
    rightButtonText?: string;
    leftButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  closeModal: () => void;
}

export const useTwoButtonModalStore = create<TwoButtonModalState>(set => ({
  isOpen: false,
  content: '',
  rightButtonText: '확인',
  leftButtonText: '취소',
  onConfirm: undefined,
  onCancel: undefined,
  openModal: ({ content, rightButtonText = '확인', leftButtonText = '취소', onConfirm, onCancel }) =>
    set({ isOpen: true, content, rightButtonText, leftButtonText, onConfirm, onCancel }),
  closeModal: () =>
    set({
      isOpen: false,
      content: '',
      rightButtonText: '확인',
      leftButtonText: '취소',
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));
