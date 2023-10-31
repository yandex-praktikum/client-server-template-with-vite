import React from 'react'
import Canvas from '../../components/Canvas/Canvas'

type TGamePage = {
  logoutCallback: () => void
}

const GamePage = ({ logoutCallback }: TGamePage) => {
  return (
    <div>
      <Canvas />
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default GamePage
