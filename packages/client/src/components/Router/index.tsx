import { createBrowserRouter } from 'react-router-dom'
import { ROUTES_NAMES } from '../../const/routeNames'
import LoginPage from '../../pages/Login'
import RegistrationPage from '../../pages/RegistrationPage'
import UserProfilePage from '../../pages/UserProfile'
import Error404 from '../../pages/Error_404'
import Error5XX from '../../pages/Error_5XX'
import MainPage from '../../pages/Main'
import GamePage from '../../pages/Game'
import ForumPage from '../../pages/Forum'
import LeaderBoardPage from '../../pages/LeaderBoard'

export const router = createBrowserRouter([
  {
    path: ROUTES_NAMES.SIGN_IN,
    element: <LoginPage />,
  },
  {
    path: ROUTES_NAMES.SIGNUP,
    element: <RegistrationPage />,
  },
  {
    path: ROUTES_NAMES.SETTINGS,
    element: <UserProfilePage />,
  },
  {
    path: ROUTES_NAMES.MAIN,
    element: <MainPage />,
  },
  {
    path: ROUTES_NAMES.GAME,
    element: <GamePage />,
  },
  {
    path: ROUTES_NAMES.LEADER_BOARD,
    element: <LeaderBoardPage />,
  },
  {
    path: ROUTES_NAMES.FORUM,
    element: <ForumPage />,
  },
  {
    path: ROUTES_NAMES.ERROR_404,
    element: <Error404 />,
  },
  {
    path: ROUTES_NAMES.ERROR_5XX,
    element: <Error5XX />,
  },
])
