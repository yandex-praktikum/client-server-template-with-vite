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

  const source = img
    ? img.startsWith('/')
      ? resourcesUrl + img
      : img
    : DEFAULT_AVATAR
  return (
    <div className={cx(classes.avatar, classes[`avatar__size--${size}`])}>
      {<img src={source} alt="user avatar" />}
    </div>
  )
}

export default Avatar
