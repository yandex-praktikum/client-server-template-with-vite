import { createBrowserRouter, type NonIndexRouteObject } from 'react-router-dom';

import { getUserData } from '../api/auth';
import Forum from '../pages/Forum';
import ForumPage from '../pages/ForumPage';
import Game from '../pages/Game';
import { Leaderboard } from '../pages/Leaderboard';
import Login from '../pages/Login';
import Root from '../pages/Root';
import Signup from '../pages/Signup';
import { IUserInfo } from '../types/pageContext';

export enum RoutePaths {
  root = '/',
  login = '/login',
  signup = '/signup',
  game = '/game',
  leaderboard = '/leaderboard',
  forum = '/forum',
  forumPage = 'forum/:postId',
}

const forumPage: NonIndexRouteObject = {
  path: RoutePaths.forumPage,
  element: <ForumPage />,
};

const children: NonIndexRouteObject[] = [
  {
    path: RoutePaths.login,
    element: <Login />,
  },
  {
    path: RoutePaths.signup,
    element: <Signup />,
  },
  {
    path: RoutePaths.game,
    element: <Game />,
  },
  {
    path: RoutePaths.forum,
    element: <Forum />,
    children: [forumPage],
  },
  {
    path: RoutePaths.leaderboard,
    element: <Leaderboard />,
  },
  forumPage,
];

/**
 * Root page
 */
export type TRootLoader = () => Promise<{
  userInfo: IUserInfo | null
  userRoutes: typeof AUTHORIZED_ROUTES
}>

export const rootLoader: TRootLoader = async () => {
  try {
    const { data } = await getUserData();

    return { userInfo: data, userRoutes: AUTHORIZED_ROUTES };
  } catch (err) {
    console.error(err);

    return { userInfo: null, userRoutes: UNAUTHORIZED_ROUTES };
  }
};

const ROOT: NonIndexRouteObject = {
  path: RoutePaths.root,
  element: <Root />,
  children,
  id: 'root',
  loader: rootLoader,
};

/**
 * Route maps
 */
export const AUTHORIZED_ROUTES = {
  basePath: RoutePaths.game,
  list: [
    RoutePaths.game,
    RoutePaths.forum,
    RoutePaths.leaderboard,
  ],
};

export const UNAUTHORIZED_ROUTES = {
  basePath: RoutePaths.login,
  list: [
    RoutePaths.login,
    RoutePaths.signup,
  ],
};

export const ROUTER = createBrowserRouter([ROOT]);
