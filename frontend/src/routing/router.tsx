import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts';
import {
  SigninPage,
  SignupPage,
  ResetPasswordPage,
  AnalysisPage,
  ExpensesPage,
  UsersPage,
  ProfilePage,
} from '../pages';
import { PublicRoute } from './public-route';
import { PrivateRoute } from './private-route';
import { routes } from './routes';

export function Router() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={routes.SIGN_IN} element={<SigninPage />} />
        <Route path={routes.SIGN_UP} element={<SignupPage />} />
        <Route path={routes.RESET_PASSWORD} element={<ResetPasswordPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<RootLayout />}>
          <Route path={routes.ANALYSIS} element={<AnalysisPage />} />
          <Route path={routes.EXPENSES} element={<ExpensesPage />} />
          <Route path={routes.USERS} element={<UsersPage />} />
          <Route path={routes.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
