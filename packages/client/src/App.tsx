import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ForumPage } from './components/ForumPage/ForumPage';
import { GamePage } from './components/GamePage/GamePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { StartPage } from './components/StartPage/StartPage';

export function App(): JSX.Element {
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={'/'} element={<StartPage />} />
          <Route path={'/game'} element={<GamePage />} />
          <Route path={'/profile'} element={<ProfilePage />} />
          <Route path={'/forum'} element={<ForumPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}
