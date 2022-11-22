import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import 'normalize.css';
import './index.css';
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundaries';
import { store } from './store/store';
import { useCustomTheme } from './useCustomTheme';

import { addServiceWorker } from '../sw/addServiceWorker';

if (import.meta.env.MODE === 'production') {
  addServiceWorker();
}

const versionStrStyle: React.CSSProperties = {
  position: 'absolute',
  margin: 'auto 0 10px 10px',
  bottom: 0,
  left: 0,
  color: 'black',
  opacity: 0.5,
  fontSize: '12px',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider theme={useCustomTheme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
            <div style={versionStrStyle}>Version: {import.meta.env.VITE_CLIENT_VERSION}</div>
          </ErrorBoundary>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </Router>
);
