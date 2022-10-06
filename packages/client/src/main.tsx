import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './store/store';
import './index.css';
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundaries';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
   </Provider>
  </React.StrictMode>,
);
