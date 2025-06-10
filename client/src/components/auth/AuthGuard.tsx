import type { ReactNode } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <span className="loader" /> {/* style this or use a library spinner */}
   
      </div>
    );
  }

  if (!user) {
    return <p className="text-red-500">Please log in to access this feature.</p>;
  }

  return <>{children}</>;
}
