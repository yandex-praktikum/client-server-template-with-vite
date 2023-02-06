import { createStaticHandler } from '@remix-run/router';
import type * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import store from './src/store/store';
import { routes } from './src/utils/routes';

/*
Note: implementation is based on the following example from react-router repo.
https://github.com/remix-run/react-router/blob/main/examples/ssr-data-router/src/entry.server.tsx
*/

export async function render(request: express.Request) {
  const { query } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(request);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(routes, context);

  return renderToString(
    <Provider store={store}>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </Provider>
  );
}

export function createFetchHeaders(
  requestHeaders: express.Request['headers']
): Headers {
  const headers = new Headers();

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();

  req.on('close', () => {
    controller.abort();
  });

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
