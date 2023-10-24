import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from './api/authApi'
import { ROUTES_NAMES } from './const/routeNames'
import './App.scss'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/RegistrationPage'
import UserProfilePage from './pages/UserProfile'
import MainPage from './pages/Main'
import GamePage from './pages/Game'

import ForumPage from './pages/Forum'
import Error404 from './pages/Error_404'
import Error5XX from './pages/Error_5XX'
import LeaderBoardPage from './pages/LeaderBoard'
import { Base } from './components/Base'

const App: FC = () => {
  const navigate = useNavigate()
  const path = useLocation().pathname

  useEffect(() => {
    if (!(ROUTES_NAMES.SIGNUP === path || ROUTES_NAMES.SIGN_IN === path)) {
      authApi
        .getUserData()
        .then(response => console.log(response))
        .catch(error => {
          console.log(error)
          navigate(ROUTES_NAMES.SIGN_IN)
        })
    }
  }, [path])

  const logoutHandler = () => {
    authApi
      .logout()
      .then(response => {
        console.log(response)
        navigate(ROUTES_NAMES.SIGN_IN)
      })
      .catch(error => {
        console.log(error)
        navigate(ROUTES_NAMES.SIGN_IN)
      })
  }

  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }
  //
  //   fetchServerData()
  // }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Base />}>
          <Route
            path={ROUTES_NAMES.LEADER_BOARD}
            element={<LeaderBoardPage />}
          />
          <Route path={ROUTES_NAMES.FORUM} element={<ForumPage />} />
          <Route
            path={ROUTES_NAMES.SETTINGS}
            element={<UserProfilePage logoutCallback={logoutHandler} />}
          />
        </Route>
        <Route
          path={ROUTES_NAMES.MAIN}
          element={<MainPage logoutCallback={logoutHandler} />}
        />
        <Route path={ROUTES_NAMES.SIGN_IN} element={<LoginPage />} />
        <Route path={ROUTES_NAMES.SIGNUP} element={<RegistrationPage />} />
        <Route
          path={ROUTES_NAMES.GAME}
          element={<GamePage logoutCallback={logoutHandler} />}
        />
        <Route path={ROUTES_NAMES.ERROR_5XX} element={<Error5XX />} />
        <Route path={ROUTES_NAMES.ERROR_404} element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
