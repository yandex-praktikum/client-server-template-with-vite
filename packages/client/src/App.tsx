import 'normalize.css';
import { useEffect } from 'react';

import './App.pcss';

export function App(): JSX.Element {
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return <div className='App'>Вот тут будет жить ваше приложение :)</div>;
}
