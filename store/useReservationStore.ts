import { create } from 'zustand';

type TabStatus = 'pending' | 'confirmed' | 'declined';

interface ReservationState {
  statusTab: TabStatus;
  setStatusTab: (status: TabStatus) => void;
  resetStatusTab: () => void;
}

export const useReservationStore = create<ReservationState>(set => ({
  statusTab: 'pending',
  setStatusTab: status => set({ statusTab: status }),
  resetStatusTab: () => set({ statusTab: 'pending' }),
}));
