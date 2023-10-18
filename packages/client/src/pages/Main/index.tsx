import React from 'react'

type TMainPage = {
  logoutCallback: () => void
}

const MainPage = ({ logoutCallback }: TMainPage) => {
  return (
    <div>
      MainPage
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default MainPage
