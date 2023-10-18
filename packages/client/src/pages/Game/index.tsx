import React from 'react'

type TGamePage = {
  logoutCallback: () => void
}

const GamePage = ({ logoutCallback }: TGamePage) => {
  return (
    <div>
      GamePage
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default GamePage
