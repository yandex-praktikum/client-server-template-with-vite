import React from 'react'

import { useStyles } from './useStyles'

import Layout from '../Layout/Layout'
import { CanvasComponent } from '../../game/CanvasComponent'

const ProfilePage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.userName}>Name</p>
        <p className={classes.userName}>LastName</p>
      </div>
      <CanvasComponent />
      <div className={classes.decorates}>
        <div className={classes.round} />
      </div>
    </Layout>
  )
}

export default ProfilePage
