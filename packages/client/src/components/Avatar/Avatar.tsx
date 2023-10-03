import classNames from 'classnames'
import { DEFAULT_AVATAR } from '@/utils/constants'

import classes from './styles.module.less'
import { baseApiUrl } from '@/api/api'

const cx = classNames.bind(classes)

type AvatarProps = {
  img?: string | null
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Avatar = ({ img, size }: AvatarProps) => {
  const resourcesUrl = baseApiUrl + 'resources'
  return (
    <div className={cx(classes.avatar, classes[`avatar__size--${size}`])}>
      {
        <img
          src={img ? resourcesUrl + img : DEFAULT_AVATAR}
          alt="user avatar"
        />
      }
    </div>
  )
}

export default Avatar
