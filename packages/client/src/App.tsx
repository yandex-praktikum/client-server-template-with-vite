import React, { useEffect } from 'react'
import './App.css'
import ProfilePage from './components/ProfilePage/ProfilePage'
import { StartPage } from './components/StartPage/StartPage'
import { GamePage } from './components/GamePage/GamePage'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001')
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  // TODO: убрать, когда будет подключен React Router
  // https://trello.com/c/IgnIMxX2/8-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D1%8F%D0%B5%D1%82-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83-%D1%81-react-router
  const isGamePage = window.location.pathname === '/game'
  const isStartGamePage = window.location.pathname === '/start'
  const isProfilePage = !isGamePage && !isStartGamePage

  return (
    <div className="App">
      {isProfilePage && <ProfilePage />}
      {isGamePage && <GamePage />}
      {isStartGamePage && <StartPage />}
    </div>
  )
}

export default App
