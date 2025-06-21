
import { create } from 'zustand';
  
interface AuthState {
  user: any;
  loading: boolean;
  role: 'user' | 'admin' | null;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
   setRole: (role: 'user' | 'admin' | null) => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  role: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setRole: (role) => set({ role }),
}));