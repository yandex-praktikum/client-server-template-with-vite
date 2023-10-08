import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { urls } from '@/utils/navigation'
import Login from '@pages/login/login'
import SignUp from '@pages/signUp/SignUp'
import LeaderboardPage from '@pages/leaderboard/Leaderboard'
import Error from '@pages/error/error'
import { ProvideTopic } from '@/providers/TopicContext'
import Forum from '@pages/forum/Forum'
import Profile from '@pages/profile/Profile'
import Presentation from '@pages/presentation/Presentation'
import Game from '@pages/game/Game'

type AppRoutersType = {
  error: number
}

const AppRouters = ({ error }: AppRoutersType) => {
  return (
    <Routes>
      <Route path={urls.home} element={<Presentation />} />
      <Route path={urls.login} element={<Login />} />
      <Route path={urls.signup} element={<SignUp />} />
      <Route path={urls.leaderboard} element={<LeaderboardPage />} />

      <Route path={urls.game} element={<Game />} />
      <Route path={urls.profile} element={<Profile />} />
      <Route
        path={urls.errorNotFound}
        element={<Error code={error} text="Page not found" />}
      />
      <Route
        path={urls.error}
        element={<Error code={500} text="Server error" />}
      />
      <Route
        path={urls.forum}
        element={
          <ProvideTopic>
            <Forum />
          </ProvideTopic>
        }
      />
      <Route
        path={`${urls.forum}/topic`}
        element={<Error code={404} text="Page not found" />}
      />
      <Route path="*" element={<Error code={404} text="Page not found" />} />
    </Routes>
  )
}

export default AppRouters
