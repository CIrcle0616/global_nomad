import { create } from 'zustand';
import React from 'react';

interface ModalState {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalContent: React.ComponentType<any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalProps: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (content: React.ComponentType<any>, props?: Record<string, any>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  modalContent: null,
  modalProps: {},
  openModal: (content, props = {}) =>
    set({
      isOpen: true,
      modalContent: content,
      modalProps: props,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      modalContent: null,
      modalProps: {},
    }),
}));
