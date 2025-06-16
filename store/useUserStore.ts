import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  profileImage?: string;
  teamId: number;
  accessToken: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

export default useUserStore;
