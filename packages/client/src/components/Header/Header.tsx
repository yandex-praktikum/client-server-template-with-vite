import React from 'react'
import { Button } from '@mui/material'

import { useStyles } from './useStyles'

const Header = () => {
  const classes = useStyles()

  const handleForumClick = () => {
    window.location.pathname = '/forum'
  }

  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.logo}>
          <span style={{ color: 'red' }}>Chicago</span>Snake
        </h1>
        <p className={classes.logoSubtitle}>Yandex Practicum Web Gaming</p>
      </div>
      <div className={classes.menu}>
        <Button style={{ color: 'black', minWidth: 120 }} variant={'text'}>
          about
        </Button>
        <Button
          style={{ color: 'black', minWidth: 120 }}
          variant={'text'}
          onClick={handleForumClick}>
          forum
        </Button>
        <Button style={{ color: 'black', minWidth: 120 }} variant={'text'}>
          team
        </Button>
        <Button style={{ color: 'black', minWidth: 120 }} variant={'text'}>
          leaderboard
        </Button>
        <Button
          style={{
            color: 'red',
            border: '1px solid red',
            marginLeft: 32,
            minWidth: 120,
          }}
          variant={'outlined'}>
          sign in
        </Button>
      </div>
    </div>
  )
}

export default Header
