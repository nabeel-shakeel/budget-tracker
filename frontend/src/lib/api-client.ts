import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { useAuthStore } from '@store/useAuthStore';
import { API_BASE_URL, publicApiEndpoints } from './api-endpoints';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token && !publicApiEndpoints.includes(config.url!)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { clearToken } = useAuthStore.getState();
      clearToken();
    }
    return Promise.reject(error.response);
  }
);
