import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CreateOrJoinGamePage } from './components/CreateOrJoinGamePage/CreateOrJoinGamePage';
import { ErrorBoundary } from './components/ErrorBoundaries/ErrorBoundaries';
import { ForumPage } from './components/ForumPage/ForumPage';
import { GamePage } from './components/GamePage/GamePage';
import { Layout } from './components/Layout/Layout';
import { LeaderboardPage } from './components/LeaderboardPage/LeaderboardPage';
import { MultiGamePage } from './components/MultiGamePage/MultiGamePage';
import { NoAuthPage } from './components/NoAuthPage/NoAuthPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { StartPage } from './components/StartPage/StartPage';
import { WaitingRoomPage } from './components/WaitingRoomPage/WaitingRoomPage';
import { useSnackbarError } from './hooks/useSnackbarError';
import { useGetUserQuery } from './services/redux/queries/user.api';
import { getUserIdSelector } from './services/redux/selectors/getUserSelector';
import { useAppSelector } from './services/redux/store';
import { useStyles } from './useStyles';

import { version } from '../package.json';

export function App(): JSX.Element {
  useGetUserQuery();

  const isUserAuthorized = !!useAppSelector(getUserIdSelector);

  const { SnackbarErrorComp } = useSnackbarError();

  const classes = useStyles();

  return (
    <ErrorBoundary>
      <div className="App">
        <Layout>
          <Routes>
            <Route path={'/'} element={<StartPage />} />
            <Route path={'/game'} element={<GamePage />} />
            <Route
              path={'/create-or-join-game'}
              element={isUserAuthorized ? <CreateOrJoinGamePage /> : <NoAuthPage />}
            />
            <Route path={'/waiting-room'} element={isUserAuthorized ? <WaitingRoomPage /> : <NoAuthPage />} />
            <Route path={'/multi-game'} element={isUserAuthorized ? <MultiGamePage /> : <NoAuthPage />} />
            <Route path={'/profile'} element={isUserAuthorized ? <ProfilePage /> : <NoAuthPage />} />
            <Route path={'/leaderboard'} element={isUserAuthorized ? <LeaderboardPage /> : <NoAuthPage />} />
            <Route path={'/forum'} element={<ForumPage />} />
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </Layout>
        <SnackbarErrorComp />
      </div>
      <div className={classes.version}>Version: {version}</div>
    </ErrorBoundary>
  );
}
