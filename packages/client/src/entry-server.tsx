import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { ThemeProvider } from '@mui/material/styles';
import { ServerStyleSheets } from '@mui/styles';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import 'normalize.css';

import { App } from './App';
import { api } from './services/redux/queries/api';
import commonReducer from './services/redux/reducers/common.reducer';
import { SocketContext, socket } from './services/socket/socket';
import { useCustomTheme } from './useCustomTheme';

import createEmotionCache from '../../shared/createEmotionCache';

export function render(url: string | Partial<Location>) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const store = configureStore({
    reducer: {
      common: commonReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  });

  const sheets = new ServerStyleSheets();

  const Main = () => (
    <StaticRouter location={url}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={useCustomTheme}>
          <Provider store={store}>
            <SocketContext.Provider value={socket}>
              <App />
            </SocketContext.Provider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </StaticRouter>
  );

  const html = ReactDOMServer.renderToString(sheets.collect(<Main />));

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  return {
    html,
    cssString: sheets.toString(),
    store: store,
    emotionCss,
  };
}
