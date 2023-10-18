import React from 'react'

type TLeaderBoardPage = {
  logoutCallback: () => void
}

const LeaderBoardPage = ({ logoutCallback }: TLeaderBoardPage) => {
  return (
    <div>
      LeaderBoardPage
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default LeaderBoardPage
