import React, { ReactNode } from 'react';

import { useStyles } from './useStyles';

import Header from '../Header/Header';

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Header />
      {children}
    </div>
  );
};
