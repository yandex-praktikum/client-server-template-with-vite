import { Button } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

const Header = () => {
  const classes = useStyles();

  const handleForumClick = () => {
    window.location.pathname = '/forum';
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.logo}>
          <span style={{ color: 'red' }}>Chicago</span>Snake
        </h1>
        <p className={classes.logoSubtitle}>Yandex Practicum Web Gaming</p>
      </div>
      <div className={classes.menu}>
        <Button className={classes.button} variant={'text'}>
          about
        </Button>
        <Button className={classes.button} variant={'text'} onClick={handleForumClick}>
          forum
        </Button>
        <Button className={classes.button} variant={'text'}>
          team
        </Button>
        <Button className={classes.button} variant={'text'}>
          leaderboard
        </Button>
        <Button className={classes.signButton} variant={'outlined'}>
          sign in
        </Button>
      </div>
    </div>
  );
};

export default Header;
