import React from 'react'
import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { fetchUserThunk } from './slices/userSlice'
import { reducer } from './store'
import App from './App'
import './index.css'

export const render = async () => {
  const store = configureStore({
    reducer,
  })

  await store.dispatch(fetchUserThunk())

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
