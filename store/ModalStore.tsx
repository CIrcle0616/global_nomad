import { create } from 'zustand';

export type ModalType = 'oneButton' | 'twoButton';

interface ModalProps {
  content: string;
  buttonText?: string;
  onConfirm: () => void;
  rightButtonText?: string;
  leftButtonText?: string;
  onCancel?: () => void;
}

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps: ModalProps | null;
  openModal: (modalType: ModalType, props: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  modalType: null,
  modalProps: null,
  openModal: (modalType, props) => set({ isOpen: true, modalType, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: null }),
}));
