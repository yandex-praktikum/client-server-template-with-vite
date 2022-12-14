import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

export const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div>
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
    </div>
  );
};
