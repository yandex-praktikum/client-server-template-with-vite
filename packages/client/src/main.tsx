import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { startServiceWorker } from '../sw/startServiceWorker';

import './index.css';

startServiceWorker();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
