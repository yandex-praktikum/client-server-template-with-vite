import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ForumPage } from './components/ForumPage/ForumPage';
import { GameMultiplayerPage } from './components/GameMultiplayerPage/GameMultiplayerPage';
import { GamePage } from './components/GamePage/GamePage';
import Loader from './components/Loader/Loader';
import NoAuthPage from './components/NoAuthPage/NoAuthPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { OnlineGamePage } from './components/OnlineGamePage/OnlineGamePage';
import { PlayMultiplayerPage } from './components/PlayMultiplayerPage/PlayMultiplayerPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { StartPage } from './components/StartPage/StartPage';
import useAuthController from './services/controllers/useAuthController';
import { useAppSelector } from './store/hooks';

export function App(): JSX.Element {
  const { checkUserAuth } = useAuthController();
  const { isLoading, currentUser } = useAppSelector(state => state.common);
  const { id } = currentUser;

  useEffect(() => {
    checkUserAuth();

    const fetchServerData = async () => {
      // TODO: change localhost for prod
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="App">
      {isLoading && <Loader />}
      <Routes>
        <Route path={'/'} element={<StartPage />} />
        <Route path={'/game'} element={id ? <GamePage /> : <NoAuthPage />} />
        {/* TODO: сделать нормальный нейминг */}
        <Route path={'/game-multiplayer'} element={id ? <GameMultiplayerPage /> : <NoAuthPage />} />
        <Route path={'/play-multiplayer'} element={id ? <PlayMultiplayerPage /> : <NoAuthPage />} />
        <Route path={'/online'} element={id ? <OnlineGamePage /> : <NoAuthPage />} />
        <Route path={'/profile'} element={id ? <ProfilePage /> : <NoAuthPage />} />
        <Route path={'/forum'} element={id ? <ForumPage /> : <NoAuthPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
