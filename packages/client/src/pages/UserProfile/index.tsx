import React from 'react'

type TUserProfilePage = {
  logoutCallback: () => void
}

const UserProfilePage = ({ logoutCallback }: TUserProfilePage) => {
  return (
    <div>
      UserProfilePage
      <button onClick={logoutCallback}>Logout</button>
    </div>
  )
}

export default UserProfilePage
