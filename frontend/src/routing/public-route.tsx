import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/useAuthStore';
import { routes } from './routes';

export function PublicRoute() {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to={routes.EXPENSES} replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
}
