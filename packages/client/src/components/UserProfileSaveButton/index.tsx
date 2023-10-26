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
      className={`${style.user_profile_button} ${style.font_24} ${className}`}>
      <span className={style.user_profile_button_text}>Сохранить</span>
    </button>
  )
}
