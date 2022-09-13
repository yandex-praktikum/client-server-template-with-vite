import { useEffect } from 'react';

// import './App.css'
import LeaderboardPage from './components/LeaderboardPage/LeaderboardPage';

function App() {
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
      <LeaderboardPage />
    </div>
  );
}

export default App;
