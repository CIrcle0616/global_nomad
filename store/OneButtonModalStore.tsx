import { create } from 'zustand';

interface OneButtonModalState {
  isOpen: boolean;
  content: string;
  buttonText: string;
  onConfirm?: () => void;
  openModal: (payload: { content: string; buttonText?: string; onConfirm?: () => void }) => void; // onConfirm로 수정
  closeModal: () => void;
}

export const useOneButtonModalStore = create<OneButtonModalState>(set => ({
  isOpen: false,
  content: '',
  buttonText: '확인',
  onConfirm: undefined,
  openModal: ({ content, buttonText = '확인', onConfirm }) => set({ isOpen: true, content, buttonText, onConfirm }),
  closeModal: () =>
    set(state => {
      state.onConfirm?.();
      return { isOpen: false, content: '', buttonText: '확인', onConfirm: undefined };
    }),
}));
