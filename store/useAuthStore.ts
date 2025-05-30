import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // persist 미들웨어 임포트

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: () => boolean; // 로그인 상태 확인 헬퍼 함수
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  // create 함수를 두 번 호출하는 형태로 변경
  persist(
    (set, get) => ({
      // get 함수도 사용 가능 (isAuthenticated 같은 함수에서)
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: () => !!get().accessToken, // 예시: accessToken 유무로 로그인 상태 판단
      setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken }),
      clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 (localStorage, sessionStorage 등)
    },
  ),
);
