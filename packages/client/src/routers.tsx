import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { urls } from '@/utils/navigation'
import HomePage from '@pages/home/Home'
import Login from '@pages/login/login'
import SignUp from '@pages/signUp/SignUp'
import LeaderboardPage from '@pages/leaderboard/Leaderboard'
import Error from '@pages/error/error'

type AppRoutersType = {
  error: number
}

const AppRouters = ({ error }: AppRoutersType) => {
  return (
    <Routes>
      <Route path={urls.home} element={<HomePage />} />
      <Route path={urls.login} element={<Login />} />
      <Route path={urls.signup} element={<SignUp />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />

      <Route path="/game" element={<Login />} />
      <Route path="/profile" element={<Login />} />
      <Route path="/forum" element={<Login />} />
      <Route path="/forum/topic" element={<Login />} />
      <Route
        path={urls.errorNotFound}
        element={<Error code={error} text="Page not found" />}
      />
      <Route
        path={urls.error}
        element={<Error code={500} text="Server error" />}
      />
      <Route path="*" element={<Error code={404} text="Page not found" />} />
    </Routes>
  )
}

export default AppRouters
