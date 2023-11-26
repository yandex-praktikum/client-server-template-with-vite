import React from 'react'
import ReactDOM from 'react-dom/client'
import StaticApp from './StaticApp'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StaticApp />
)
