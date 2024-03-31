import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';
import './index.css';

import { setIconByPreferenceScheme } from '@common';
import { BrowserRouter } from 'react-router-dom';

// The dark logo url is a placeholder using a image placed in the project, I recommend to change it to the actual dark logo image
setIconByPreferenceScheme({ dark: '/images/logo.webp', light: '/logo.webp' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
