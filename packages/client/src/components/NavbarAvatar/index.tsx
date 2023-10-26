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
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none">
            <path
              fill="#292D32"
              d="M7 7.419a3.213 3.213 0 0 1-3.208-3.21A3.213 3.213 0 0 1 7 1.002 3.213 3.213 0 0 1 10.21 4.21 3.213 3.213 0 0 1 7 7.419Zm0-5.58a2.377 2.377 0 0 0-2.371 2.37A2.377 2.377 0 0 0 7 6.582 2.377 2.377 0 0 0 9.372 4.21 2.377 2.377 0 0 0 7 1.838ZM11.794 12.999a.422.422 0 0 1-.419-.419c0-1.925-1.964-3.487-4.375-3.487-2.41 0-4.375 1.562-4.375 3.487 0 .23-.19.419-.418.419a.422.422 0 0 1-.419-.419c0-2.383 2.338-4.324 5.212-4.324 2.874 0 5.212 1.941 5.212 4.324 0 .23-.19.419-.418.419Z"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
