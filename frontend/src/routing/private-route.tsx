import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  //   if (user) {
  //     return <Navigate to="/" replace />;
  //   }

  // If the user is logged in, render the child routes
  return <Outlet />;
}
