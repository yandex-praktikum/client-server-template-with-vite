import { useEffect } from 'react';

import ProfilePage from './components/ProfilePage/ProfilePage';

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
      <ProfilePage />
    </div>
  );
}
