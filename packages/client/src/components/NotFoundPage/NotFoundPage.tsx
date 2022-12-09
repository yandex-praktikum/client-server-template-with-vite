import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

import { Layout } from '../Layout/Layout';

export const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.subTitle}>Oops..</p>
        <p className={classes.title}>404</p>
      </div>
      <p className={classes.text}>
        But you can start playing{' '}
        <Link className={classes.link} to={'/'}>
          over here!
        </Link>
      </p>
    </Layout>
  );
};
