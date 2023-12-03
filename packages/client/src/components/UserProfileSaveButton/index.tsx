import React from 'react'
import style from './index.module.scss'

type TUserProfileSaveButton = {
  className?: string
}

export const UserProfileSaveButton = ({
  className = '',
}: TUserProfileSaveButton) => {
  return (
    <button
      type="submit"
      className={`${style.userProfileButton} ${style.font_24} ${className}`}>
      <span className={style.userProfileButtonText}>Сохранить</span>
    </button>
  )
}
