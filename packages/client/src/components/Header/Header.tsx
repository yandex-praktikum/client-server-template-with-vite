import React, { useContext, useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Avatar from '@components/Avatar/Avatar'
import { urls } from '@/utils/navigation'
import classes from './styles.module.less'
import { UserContext } from '@/providers/userProvider/UserContext'
import { postLogout } from '@/api/auth'
import { baseApiUrl } from '@/api/api'

const cx = classNames.bind(classes)

const menuList = [
  {
    id: 'index',
    title: 'Home',
    link: '/',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    id: 'game',
    title: 'Game',
    link: '/game',
  },
  {
    id: 'forum',
    title: 'Forum',
    link: '/forum',
  },
  {
    id: 'presentation',
    title: 'Presentation',
    link: '/presentation',
  },
]

const Header = () => {
  const activePage =
    window.location.pathname === '/'
      ? 'index'
      : window.location.pathname.substring(1).split('/')[0]
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { avatar } = useContext(UserContext)
  const resourcesUrl = baseApiUrl + 'resources';
  const navigate = useNavigate()
  const menu = useMemo(
    () =>
      menuList.map(item => ({
        ...item,
        className:
          item.id === activePage
            ? classes['header__menu__item--active']
            : classes['header__menu__item--default'],
      })),
    [activePage]
  )

  const handleLogout = async () => {
    await postLogout()
    navigate(urls.login)
  }

  const switchShowUserMenu = () => {
    setShowUserMenu(prevState => !prevState)
  }

  return (
    <div className={classes.header}>
      <div className={classes.header__logotype}>Tetris</div>
      <div className={classes.header__menu}>
        {menu.map(item => (
          <NavLink
            to={item.link}
            className={cx(classes.header__menu__item, item.className)}
            key={`menu-header__item-${item.id}`}>
            {item.title}
          </NavLink>
        ))}
      </div>
      <div
        className={classes.header__menu__avatar}
        onClick={switchShowUserMenu}>
        <Avatar size="xs" img={resourcesUrl + avatar} />
        {showUserMenu && (
          <ul className={classes.header__user_menu}>
            <li><a href={urls.profile}>Profile</a></li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Header
