// useAuthStore.ts
import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

type AuthState = {
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
}));

// Initialize auth listener once (in main entry point like App.tsx)
let authInitialized = false;
export const initAuthListener = () => {
  if (authInitialized) return;

  authInitialized = true;
  const setUser = useAuthStore.getState().setUser;

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
};
