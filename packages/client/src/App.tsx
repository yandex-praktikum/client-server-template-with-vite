import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from './api/authApi'
import { ROUTES_NAMES } from './const/routeNames'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/RegistrationPage'
import UserProfilePage from './pages/UserProfile'
import MainPage from './pages/Main'
import GamePage from './pages/Game'
import Error404 from './pages/Error_404'
import Error5XX from './pages/Error_5XX'
import LeaderBoardPage from './pages/LeaderBoard'
import { BaseComponent } from './components/Base'
import { ForumCreation } from './pages/Forum/ForumCreation'
import { ForumDetails } from './pages/Forum/ForumDetails'
import './App.scss'
import { ErrorBoundary } from './hoc/ErrorBoundary'
import { withAuthCheck } from './hoc/WithAuthCheck'
import { useAppDispatch, useAppSelector } from './hook/hook'
import { getUser } from './store/user/actions'
import { ForumPage } from './pages/Forum/ForumsList'
import { setIsAuth, setIsDataFetched } from './store/user/slice'
import { getUserSliceData } from './store/user/selectors'

const AppComponent = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const path = useLocation().pathname
  const { user } = useAppSelector(getUserSliceData)

  useEffect(() => {
    if (
      !(
        path === ROUTES_NAMES.SIGNUP ||
        path === ROUTES_NAMES.SIGN_IN ||
        path === ROUTES_NAMES.SETTINGS
      ) &&
      !user.id
    ) {
      dispatch(getUser())
    }
  }, [dispatch, path])

  const logoutHandler = () => {
    authApi
      .logout()
      .then(() => {
        dispatch(setIsAuth(false))
        dispatch(setIsDataFetched(false))
        navigate(ROUTES_NAMES.SIGN_IN)
      })
      .catch(() => {
        dispatch(setIsAuth(false))
        dispatch(setIsDataFetched(false))
        navigate(ROUTES_NAMES.SIGN_IN)
      })
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

        <Route path={ROUTES_NAMES.GAME} element={<GamePage />} />
        <Route path={ROUTES_NAMES.ERROR_5XX} element={<Error5XX />} />
        <Route path={ROUTES_NAMES.ERROR_404} element={<Error404 />} />
      </Routes>
    </ErrorBoundary>
  )
}

const App = withAuthCheck(AppComponent)

export default App
