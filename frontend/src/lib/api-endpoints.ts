export const API_BASE_URL = process.env.API_BASE_URL;

export enum API_ENDPOINTS {
  // auth endpoints
  SIGNIN = 'auth/signin',
  SIGNUP = 'auth/signup',
  FORGOT_PASSWORD = 'auth/forgot-password',
  RESET_PASSWORD = 'auth/reset-password',

  // expense endpoints
  EXPENSES = 'expenses',
  EXPENSE_BY_ID = 'expenses/{id}',
  EXPENSES_TREND = 'expenses/trend',

  // admin endpoints
  ADMIN_USER = 'admin/users',
  ADMIN_USER_BY_ID = 'admin/users/{id}',

  // profile endpoints
  PROFILE = 'profile',
}

export const publicApiEndpoints: string[] = [
  API_ENDPOINTS.SIGNIN,
  API_ENDPOINTS.SIGNUP,
  API_ENDPOINTS.FORGOT_PASSWORD,
  API_ENDPOINTS.RESET_PASSWORD,
];
