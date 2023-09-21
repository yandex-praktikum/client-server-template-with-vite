import React from 'react'
import classNames from 'classnames'
import classes from './styles.module.less'

const cx = classNames.bind(classes)

const DEFAULT_AVATAR = ''

type AvatarProps = {
  img?: string | null
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Avatar = ({ img, size }: AvatarProps) => {
  return (
    <div className={cx(classes.avatar, classes[`avatar__size--${size}`])}>
      {<img src={img || DEFAULT_AVATAR} alt="user avatar" />}
    </div>
  )
}

export default Avatar
