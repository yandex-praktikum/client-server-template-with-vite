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
  isError: boolean
  url: string | null
  errorMessage: string
  changeAvatarHandler: (data: FormData) => void
  className?: string
}

export const UserAvatar = ({
  url,
  isError,
  errorMessage,
  changeAvatarHandler,
  className = '',
}: TUserAvatar) => {
  const src = getFullUrlToResource(url, BASE_RESOURCES_URL)
  const ref = useRef<HTMLInputElement>(null)
  const [isShow, setIsShow] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isError && ref.current?.files) {
      ref.current.value = ''
    }
  }, [isError])

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

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = event.currentTarget

    setError('')

    if (files) {
      const file = files[0]
      const fileExtension = file.name.split('.')[1]

      if (imageFileExtension.includes(`.${fileExtension}`)) {
        const formData = new FormData()
        formData.append(name, file)

        changeAvatarHandler(formData)
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
          <img src={src} alt="avatar" className={style.avatarImage} />
        ) : (
          <img src="./src/assets/userBig.svg" />
        )}
        {isShow ? (
          <div onClick={fileUploadHandler} className={`${style.avatarCover}`}>
            <span className={`${style.avatarCoverText}`}>Поменять аватар</span>
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
      {error || isError ? (
        <ErrorMessage
          text={error || errorMessage}
          className="error-message-margin"
        />
      ) : null}
    </div>
  )
}
