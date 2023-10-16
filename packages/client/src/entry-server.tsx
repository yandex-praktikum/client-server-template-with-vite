import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

import {
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { reducer } from './store'
import { routes } from './routes'
import './index.css'

export const render = async (req: ExpressRequest) => {
  // 1.
  const { query, dataRoutes } = createStaticHandler(routes)
  // 2.
  const fetchRequest = createFetchRequest(req)
  // 3.
  const context = await query(fetchRequest)

  // 4.
  if (context instanceof Response) {
    throw context
  }

  // 5.
  const store = configureStore({
    reducer,
  })

  // 6.
  const router = createStaticRouter(dataRoutes, context)

  // 7.
  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
