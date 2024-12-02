import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@lib/api-client';
import { API_ENDPOINTS } from '@lib/api-endpoints';
import {
  ISignin,
  ISignup,
  IForgotPassword,
  IResetPassword,
  ISigninResponse,
} from './auth.types';

const signin = async (data: ISignin): Promise<ISigninResponse> =>
  apiClient.post(API_ENDPOINTS.SIGNIN, data);

const signup = async (data: Omit<ISignup, 'confirmPassword'>) => {
  const response = await apiClient.post(API_ENDPOINTS.SIGNUP, data);
  return response;
};

const forgotPassword = async (data: IForgotPassword) => {
  const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, data);
  return response;
};

const resetPassword = async (data: IResetPassword & { token: string }) => {
  const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, data);
  return response;
};

export const useSignin = () => {
  return useMutation({
    mutationFn: signin,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
