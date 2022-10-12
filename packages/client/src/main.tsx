import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundaries';
import { store } from './store/store';
import './index.css';

import { addServiceWorker } from '../sw/addServiceWorker';

addServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
