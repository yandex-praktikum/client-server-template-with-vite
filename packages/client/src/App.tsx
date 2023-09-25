import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorType } from '@/api/getApiError'
import { UserContextProvider } from '@/providers/userProvider/UserProvider'
import { activePage, urls } from '@/utils/navigation'
import { UserType } from '@components/types'
import SignUp from '@pages/signUp/SignUp'
import LeaderboardPage from '@pages/leaderboard/Leaderboard'
import Login from '@pages/login/login'
import HomePage from '@pages/home/Home'
import Error from '@pages/error/error'
import { getUserInfo } from './api/auth'

const closePage = ['profile', 'game', 'forum', 'leaderboard', '/']

function App() {
  const [getUserError, setGetUserError] = useState<ErrorType | null>()
  const [userInfo, setUserInfo] = useState<UserType | null>({} as UserType)
  /*
  //TODO эта часть может понадобиться в дальнейшем для работы с бекендом. Пока оставила.
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
      await getUserInfo()
        .then(result => {
          setUserInfo(result)
          if (activePage === 'login' || activePage === 'registration') {
            window.location.href = urls.home
          }
        })
        .catch(({ error }) => {
          setGetUserError(error)
          if (error.code === 500) {
            window.location.href = urls.error
          } else if (
            error.code >= 400 &&
            error.code < 500 &&
            (closePage.indexOf(activePage) !== -1 || activePage === '')
          ) {
            window.location.href = urls.errorNotFound
          }
        })
    }
    fetchUserInfo()
  }, [])

  return (
    <React.StrictMode>
      <UserContextProvider user={userInfo}>
        <BrowserRouter>
          <Routes>
            <Route path={urls.home} element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path={urls.signup} element={<SignUp />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />

            <Route path="/game" element={<Login />} />
            <Route path="/profile" element={<Login />} />
            <Route path="/forum" element={<Login />} />
            <Route path="/forum/topic" element={<Login />} />
            <Route
              path={urls.errorNotFound}
              element={
                <Error
                  code={getUserError?.error?.code || 401}
                  text="Page not found"
                />
              }
            />
            <Route
              path={urls.error}
              element={<Error code={500} text="Server error" />}
            />
            <Route
              path="*"
              element={<Error code={404} text="Page not found" />}
            />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </React.StrictMode>
  )
}

export default App
