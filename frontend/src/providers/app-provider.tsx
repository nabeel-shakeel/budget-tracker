import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/react-query';
import { NotificationProvider } from './notification-provider';
import { theme } from '../theme/theme';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <NotificationProvider>{children}</NotificationProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
