// useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  user: any; // Replace 'any' with Firebase User if you want strong typing
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
