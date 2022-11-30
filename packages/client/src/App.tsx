import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { ForumPage } from './pages/ForumPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { StartPage } from './pages/StartPage';

export enum Paths {
  start = '/',
  profile = '/profile',
  forum = '/forum',
  notFound = '/not-found',
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.start} element={<StartPage />} />
        <Route path={Paths.profile} element={<ProfilePage />} />
        <Route path={Paths.forum} element={<ForumPage />} />
        <Route path={Paths.notFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
