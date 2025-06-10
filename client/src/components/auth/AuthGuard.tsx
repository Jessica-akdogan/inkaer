import type { ReactNode } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import Spinner from "../ui/Spinner";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <Spinner />;
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
