import React from 'react'
import { UserFormLinkButton } from '../UserFormLinkButton'
import style from './index.module.scss'

type TUserProfileButtonBlock = {
  logOut: () => void
  userDataChange: () => void
  passwordChange: () => void
}

export const UserProfileButtonBlock = ({
  logOut,
  passwordChange,
  userDataChange,
}: TUserProfileButtonBlock) => {
  return (
    <div className={style.button_wrapper}>
      <UserFormLinkButton text="Изменить данные" callback={userDataChange} />
      <UserFormLinkButton text="Изменить пароль" callback={passwordChange} />
      <UserFormLinkButton
        text="Выйти"
        callback={logOut}
        isNoBorder
        className={style.red_text}
      />
    </div>
  )
}
