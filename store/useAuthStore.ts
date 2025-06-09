import { create } from 'zustand';
import { UserServiceResponseDto as User } from '@/types';

interface AuthStore {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isLoggedIn: false, // 초기값은 쿠키 확인 후 설정될 수 있음
  user: null,
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  setUser: user => set({ user }),
}));
