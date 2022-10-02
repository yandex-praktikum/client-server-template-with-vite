import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.logo}>
          <span style={{ color: 'red' }}>Chicago</span>Snake
        </h1>
        <p className={classes.logoSubtitle}>Yandex Practicum Web Gaming</p>
      </div>
      <div className={classes.menu}>
        <Link to={'/'} className={classes.button}>
          about
        </Link>
        <Link to={'/forum'} className={classes.button}>
          forum
        </Link>
        <Link to={'/leaderboard'} className={classes.button}>
          leaderboard
        </Link>
        <Link to={'/sign-in'} className={classes.signButton}>
          sign in
        </Link>
      </div>
    </div>
  );
};

export default Header;
