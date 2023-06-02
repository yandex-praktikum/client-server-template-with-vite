import React from 'react'
import ReactDOM from 'react-dom/server'
import App from './App'
import './index.css'

export const render = () => ReactDOM.renderToString(<App />)
