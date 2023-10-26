import React from 'react'
import { BASE_RESOURCES_URL } from '../../const/api'
import { getFullUrlToResource } from '../../utils/helpers'
import style from './index.module.scss'

type TNavbarAvatar = {
  imageUrl: string
}

export const NavbarAvatar = ({ imageUrl }: TNavbarAvatar) => {
  const src = getFullUrlToResource(imageUrl, BASE_RESOURCES_URL)

  return (
    <div className={style.avatar_wrapper}>
      {imageUrl ? (
        <img src={src} alt="avatar" className={style.avatar_image} />
      ) : (
        <img src="./src/assets/user.svg" />
      )}
    </div>
  )
}
