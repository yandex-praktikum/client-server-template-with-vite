import React from 'react'
import { BASE_RESOURCES_URL } from '../../const/api'
import { getFullUrlToResource } from '../../utils/helpers'
import style from './index.module.scss'

type TAvatar = {
  imageUrl: string | null
  size?: string | number
  className?: string
}

export const Avatar = ({
  imageUrl,
  size = '1.875rem',
  className = '',
}: TAvatar) => {
  const src = getFullUrlToResource(imageUrl, BASE_RESOURCES_URL)

  return (
    <div style={{ width: size, height: size }}>
      {imageUrl ? (
        <img
          className={`${style.avatar} ${className}`}
          src={src}
          alt="avatar"
        />
      ) : (
        <img
          className={`${style.avatar} ${className}`}
          src="/src/assets/avatar.svg"
        />
      )}
    </div>
  )
}
