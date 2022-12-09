import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import 'normalize.css';

import { App } from './App';
import { api } from './services/redux/queries/api';
import commonReducer from './services/redux/reducers/common.reducer';
import { SocketContext } from './services/socket/socket';
import { addServiceWorker } from './services/sw/addServiceWorker';
import { useCustomTheme } from './useCustomTheme';

import createEmotionCache from '../../shared/createEmotionCache';
import { IClientToServerEvents, IServerToClientEvents } from '../../shared/types';

if (import.meta.env.MODE === 'production') {
  addServiceWorker();
}

declare global {
  interface Window {
    // @ts-ignore
    __PRELOADED_STATE__: any;
  }
}

const store = configureStore({
  preloadedState: window.__PRELOADED_STATE__,
  reducer: {
    common: commonReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

const cache = createEmotionCache();

const Main = () => {
  const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io({
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.info('Socket connected');
  });

  socket.on('disconnect', () => {
    console.info('Socket disconnected');
  });

  useEffect(() => {
    delete window.__PRELOADED_STATE__;
  }, []);

  return (
    <BrowserRouter>
      <CacheProvider value={cache}>
        <ThemeProvider theme={useCustomTheme}>
          <Provider store={store}>
            <SocketContext.Provider value={socket}>
              <App />
            </SocketContext.Provider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  );
};

const isFromSSR = document.querySelector('#root')?.children.length !== 0;

if (isFromSSR) {
  ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <Main />);
  console.log('hydrated root');
} else {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />);
  console.log('created root');
}
