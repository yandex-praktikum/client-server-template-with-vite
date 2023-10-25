import React from 'react'

type TForumPage = {
  logoutCallback: () => void
}

const ForumPage = ({ logoutCallback }: TForumPage) => {
  throw new Error('Ошибка на клиенте')
  return (
    <div>
      ForumPage
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default ForumPage
