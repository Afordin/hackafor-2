import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import setIconByPreferenceSchema from './utils/setIconByPreferenceSchema';

setIconByPreferenceSchema({ dark: '/images/logo.webp', light: 'logo.webp' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
