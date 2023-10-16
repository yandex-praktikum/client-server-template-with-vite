import { AppDispatch, RootState } from './store'

import { MainPage } from './pages/Main'
import { FriendsPage } from './pages/FriendsPage'
import { NotFoundPage } from './pages/NotFound'

export const routes = [
  {
    path: '/',
    Component: MainPage,
  },
  {
    path: '/friends',
    Component: FriendsPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]
