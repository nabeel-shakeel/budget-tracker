import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from '@providers/app-provider';
import { App } from './app/App';
import '@styles/global.scss';
import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

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
