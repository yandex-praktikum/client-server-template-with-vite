import React from 'react'

type TForumPage = {
  logoutCallback: () => void
}

const ForumPage = ({ logoutCallback }: TForumPage) => {
  return (
    <div>
      ForumPage
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default ForumPage
