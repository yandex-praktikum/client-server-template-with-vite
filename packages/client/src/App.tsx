import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '@pages/signUp/SignUp'
import { UserContextProvider } from '@/providers/userProvider/UserProvider'
import LeaderboardPage from '@pages/leaderboard/Leaderboard'
import Login from '@pages/login/login'
import { activePage } from '@/utils/navigation'
import avatar from '../public/avatar1.jpg'
import { getUserInfo } from './api/auth'

const defaultUser = {
  avatar: avatar,
  first_name: 'Link',
  second_name: 'Hyrule',
  login: 'Link',
  email: 'email@test.com',
}

const closePage = ['profile', 'game', 'forum', 'leaderboard']

function App() {
  /*
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
   */

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (closePage.indexOf(activePage) !== -1) {
        const result = await getUserInfo()
        console.log('=app', result)
      }
    }
    //const result = await getUserInfo();
    //console.log('=app result', result)
    fetchUserInfo()
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider user={defaultUser}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<SignUp />} />
            <Route path="/game" element={<Login />} />
            <Route path="/profile" element={<Login />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/forum" element={<Login />} />
            <Route path="/forum/topic" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </React.StrictMode>
  )
}

export default App
