import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import '@styles/styles.less'
import Login from './pages/login/login'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<App />} />
        <Route path="/game" element={<App />} />
        <Route path="/profile" element={<App />} />
        <Route path="/leaderboard" element={<App />} />
        <Route path="/forum" element={<App />} />
        <Route path="/forum/topic" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
