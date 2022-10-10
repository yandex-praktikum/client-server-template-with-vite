import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

import EntranceModal from '../EntranceModal/EntranceModal';

const Header = () => {
  const classes = useStyles();
  const [isEntranceOpen, setIsEntranceOpen] = React.useState(false);

  const openEntranceModalHandler = React.useCallback(() => {
    setIsEntranceOpen(!isEntranceOpen);
  }, [isEntranceOpen]);

  return (
    <>
      {isEntranceOpen && <EntranceModal onClose={openEntranceModalHandler} />}
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
          <Button
            size={'medium'}
            variant={'outlined'}
            onClick={openEntranceModalHandler}
            className={classes.signButton}>
            Sign in
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
