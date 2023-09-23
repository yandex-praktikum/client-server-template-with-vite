import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import '@styles/styles.less'
import Error from './pages/error/error'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/registration" element={<App />} />
        <Route path="/game" element={<App />} />
        <Route path="/profile" element={<App />} />
        <Route path="/leaderboard" element={<App />} />
        <Route path="/forum" element={<App />} />
        <Route path="/forum/topic" element={<App />} />
        <Route path="/notFound" element={<Error code={404} text='Page not found'/>} />        
        <Route path="/error" element={<Error code={500} text='Server error'/>} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
