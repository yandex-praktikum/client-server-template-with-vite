import { useEffect } from 'react'
import './App.css'
import ProfilePage from './components/ProfilePage/ProfilePage'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001')
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App"><ProfilePage /></div>
}

export default App
