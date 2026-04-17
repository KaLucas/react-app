import { useAuthContext } from '@context/use-auth-context';
import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

export default function PrivateRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}
