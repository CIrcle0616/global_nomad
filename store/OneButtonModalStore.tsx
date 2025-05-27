import { create } from 'zustand';

interface OneButtonModalState {
  isOpen: boolean;
  content: string;
  buttonText: string;
  openModal: (payload: { content: string; buttonText?: string }) => void;
  closeModal: () => void;
}

export const useOneButtonModalStore = create<OneButtonModalState>(set => ({
  isOpen: false,
  content: '',
  buttonText: '확인',
  openModal: ({ content, buttonText = '확인' }: { content: string; buttonText?: string }) =>
    set({ isOpen: true, content, buttonText }),
  closeModal: () => set({ isOpen: false, content: '', buttonText: '확인' }),
}));
