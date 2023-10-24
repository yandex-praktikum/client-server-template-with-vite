import React, { useEffect, useRef, useState } from 'react'
import { ErrorMessage } from '../ErrorMessage'
import { BASE_RESOURCES_URL } from '../../const/api'
import { getFullUrlToResource } from '../../utils/helpers'
import {
  imageFileExtension,
  USER_PROFILE_ERRORS_TEXT,
} from '../../const/userProfile'
import style from './index.module.scss'

type TUserAvatar = {
  url: string
  changeAvatarHandler: (data: FormData) => Promise<string>
  className?: string
}

export const UserAvatar = ({
  url,
  changeAvatarHandler,
  className = '',
}: TUserAvatar) => {
  const src = getFullUrlToResource(url, BASE_RESOURCES_URL)
  const ref = useRef<HTMLInputElement>(null)
  const [isShow, setIsShow] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (error && ref.current?.files) {
      ref.current.value = ''
    }
  }, [error])

  const onMouseOverHandler = () => {
    setIsShow(true)
  }

  const onMouseLeaveHandler = () => {
    setIsShow(false)
  }

  const fileUploadHandler = () => {
    if (ref.current) {
      ref.current.click()
    }
  }

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files, name } = event.currentTarget

    setError('')

    if (files) {
      const file = files[0]
      const fileExtension = file.name.split('.')[1]

      if (imageFileExtension.includes(`.${fileExtension}`)) {
        const formData = new FormData()
        formData.append(name, file)

        const result = await changeAvatarHandler(formData)

        if (result) {
          setError(result)
        }
      } else {
        setError(USER_PROFILE_ERRORS_TEXT.FILE_EXTENSION)
      }
    }
  }

  return (
    <div className={style.wrapper}>
      <div
        onMouseOver={onMouseOverHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={`${style.avatar} ${className}`}>
        {url ? (
          <img src={src} alt="avatar" className={style.avatar_image} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="none">
            <path
              fill="#292D32"
              d="M25 26.56a12 12 0 0 1-11.98-11.98A12 12 0 0 1 25 2.6a12 12 0 0 1 11.98 11.98A12 12 0 0 1 25 26.56Zm0-20.83a8.87 8.87 0 0 0-8.85 8.85A8.87 8.87 0 0 0 25 23.44a8.87 8.87 0 0 0 8.85-8.86A8.87 8.87 0 0 0 25 5.73ZM42.9 47.4c-.86 0-1.57-.71-1.57-1.57 0-7.18-7.33-13.02-16.33-13.02-9 0-16.33 5.84-16.33 13.02 0 .86-.71 1.57-1.57 1.57-.85 0-1.56-.71-1.56-1.57 0-8.9 8.73-16.14 19.46-16.14s19.46 7.25 19.46 16.14c0 .86-.71 1.57-1.56 1.57Z"
            />
          </svg>
        )}
        {isShow ? (
          <div onClick={fileUploadHandler} className={`${style.avatar_cover}`}>
            <span className={`${style.avatar_cover_text}`}>
              Поменять аватар
            </span>
          </div>
        ) : null}
        <input
          ref={ref}
          type="file"
          name="avatar"
          style={{ display: 'none' }}
          accept={imageFileExtension.join(', ')}
          onChange={onChangeHandler}
        />
      </div>
      {error ? (
        <ErrorMessage text={error} className="error_message_margin" />
      ) : null}
    </div>
  )
}
