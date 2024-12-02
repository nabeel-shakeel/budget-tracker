export interface ISignin {
  email: string;
  password: string;
}

export interface ISigninResponse {
  token: string;
}

export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  budgetLimit: number;
}

export interface IResetPassword {
  newPassword: string;
}

export interface IForgotPassword {
  email: string;
}
