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
          <img src="./src/assets/userBig.svg" />
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
