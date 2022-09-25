// import 'normalize.css';

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundaries';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
