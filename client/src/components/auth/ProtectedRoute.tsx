import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }:  Props) => {
  const { user, loading } = useAuthStore();

  if (loading) return null;
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
