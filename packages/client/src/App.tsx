import React from 'react';
import { Route, Routes } from 'react-router-dom';

 
function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

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
