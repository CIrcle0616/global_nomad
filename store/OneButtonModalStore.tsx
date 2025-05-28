import { create } from 'zustand';

interface OneButtonModalState {
  isOpen: boolean;
  content: string;
  buttonText: string;
  onClose?: () => void;
  openModal: (payload: { content: string; buttonText?: string; onClose?: () => void }) => void;
  closeModal: () => void;
}

export const useOneButtonModalStore = create<OneButtonModalState>(set => ({
  isOpen: false,
  content: '',
  buttonText: '확인',
  onClose: undefined,
  openModal: ({ content, buttonText = '확인', onClose }) => set({ isOpen: true, content, buttonText, onClose }),
  closeModal: () =>
    set(state => {
      if (state.onClose) state.onClose();
      return { isOpen: false, content: '', buttonText: '확인', onClose: undefined };
    }),
}));
