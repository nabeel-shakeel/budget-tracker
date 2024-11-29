import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from '@providers/app-provider';
import { App } from './app/App';
import '@styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
