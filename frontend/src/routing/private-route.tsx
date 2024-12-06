import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/useAuthStore';
import { routes } from './routes';

export function PrivateRoute() {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to={routes.SIGN_IN} replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
}
