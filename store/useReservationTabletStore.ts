import { create } from 'zustand';

interface TabletModalState {
  isOpen: boolean;
  openModal: () => void;
  toggleModal: () => void;
}

export const useTabletModalStore = create<TabletModalState>((set, get) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  toggleModal: () => set({ isOpen: !get().isOpen }),
}));
