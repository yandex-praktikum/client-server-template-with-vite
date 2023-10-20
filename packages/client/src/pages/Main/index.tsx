import React from 'react'
import { ROUTES_NAMES } from '../../const/routeNames'
import { Link } from 'react-router-dom'
type TMainPage = {
  logoutCallback: () => void
}

const MainPage = ({ logoutCallback }: TMainPage) => {
  return (
    <div>
      MainPage
      <button onClick={logoutCallback}>Logout</button>
      <Link to={ROUTES_NAMES.LEADER_BOARD}>Доска лидеров</Link>
    </div>
  )
}

export default MainPage
