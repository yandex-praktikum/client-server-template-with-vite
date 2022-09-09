import React, { ReactNode } from 'react'
import Header from '../Header/Header'

import { useStyles } from './useStyles'

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Header />
      {children}
    </div>
  )
}

export default Layout
