import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main'
import GamePage from './pages/Game'
import LoginPage from './pages/Login'
import Error404 from './pages/Error_404'
import Error5XX from './pages/Error_5XX'
import { ROUTES_NAMES } from './const/routeNames'
import UserProfilePage from './pages/UserProfile'
import LeaderBoardPage from './pages/LeaderBoard'
import { BaseComponent } from './components/Base'
import { ErrorBoundary } from './hoc/ErrorBoundary'
import { withAuthCheck } from './hoc/WithAuthCheck'
import { ForumPage } from './pages/Forum/ForumsList'
import { getUserData } from './store/user/selectors'
import RegistrationPage from './pages/RegistrationPage'
import { ForumDetails } from './pages/Forum/ForumDetails'
import { ForumCreation } from './pages/Forum/ForumCreation'
import { useAppDispatch, useAppSelector } from './hook/hook'
import { getUserDataThunk, logout } from './store/user/dispatchecrs'
import './App.scss'

const AppComponent = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getUserData)

  useEffect(() => {
    if (!user.id) {
      dispatch(getUserDataThunk())
    }
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path={ROUTES_NAMES.SIGN_IN} element={<LoginPage />} />
        <Route path={ROUTES_NAMES.SIGNUP} element={<RegistrationPage />} />
        <Route element={<BaseComponent />}>
          <Route
            path={ROUTES_NAMES.LEADER_BOARD}
            element={<LeaderBoardPage />}
          />
          <Route path={ROUTES_NAMES.FORUM} element={<ForumPage />} />
          <Route
            path={ROUTES_NAMES.FORUM_CREATION}
            element={<ForumCreation />}
          />
          <Route path={ROUTES_NAMES.FORUM_DETAILS} element={<ForumDetails />} />
          <Route
            path={ROUTES_NAMES.SETTINGS}
            element={<UserProfilePage logoutCallback={logoutHandler} />}
          />
        </Route>
        <Route
          path={ROUTES_NAMES.MAIN}
          element={<MainPage logoutCallback={logoutHandler} />}
        />

        <Route
          path={ROUTES_NAMES.GAME}
          element={<GamePage logoutCallback={logoutHandler} />}
        />
        <Route path={ROUTES_NAMES.ERROR_5XX} element={<Error5XX />} />
        <Route path={ROUTES_NAMES.ERROR_404} element={<Error404 />} />
      </Routes>
    </ErrorBoundary>
  )
}

const App = withAuthCheck(AppComponent)

export default App
