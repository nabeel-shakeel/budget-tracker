import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  //   if (user) {
  //     return <Navigate to="/" replace />;
  //   }

  // If the user is logged in, render the child routes
  return <Outlet />;
}
