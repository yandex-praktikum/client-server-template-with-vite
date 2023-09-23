import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import SignUp from '@pages/signUp/SignUp'
import LeaderboardPage from '@pages/leaderboard/Leaderboard'
import '@styles/styles.less'
import Login from './pages/login/login'
import { UserContextProvider } from '@/providers/userProvider/UserProvider'

import avatar from '../public/avatar1.jpg'

const defaultUser = {
  avatar: avatar,
  first_name: 'Link',
  second_name: 'Hyrule',
  login: 'Link',
  email: 'email@test.com',
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider user={defaultUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/game" element={<App />} />
          <Route path="/profile" element={<App />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/forum" element={<App />} />
          <Route path="/forum/topic" element={<App />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
)
