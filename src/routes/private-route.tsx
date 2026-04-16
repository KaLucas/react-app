import { useAuthContext } from '@context/use-auth-context';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: any) {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
