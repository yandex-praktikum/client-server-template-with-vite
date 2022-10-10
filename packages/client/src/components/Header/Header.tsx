import { styled, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

import { useNavigatorOnLine } from '../../hooks/useNavigatorOnLine';

const OnOffIndicator = styled('div')(({ isOnline }: { isOnline: boolean }) => ({
  background: isOnline ? 'green' : 'red',
  width: '10px',
  height: '10px',
  display: 'inline-block',
  borderRadius: '50%',
  position: 'relative',
  top: '-30px',
}));

const Header = () => {
  const isOnline = useNavigatorOnLine();

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.logo}>
          <span style={{ color: 'red' }}>Chicago</span>Snake
          <Tooltip title={isOnline ? 'Online' : 'Offline'}>
            <OnOffIndicator isOnline={isOnline} />
          </Tooltip>
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
