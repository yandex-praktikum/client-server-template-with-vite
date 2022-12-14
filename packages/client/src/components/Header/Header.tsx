import { LoadingButton } from '@mui/lab';
import { Tooltip, Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OnOffIndicator } from './parts/OnOffIndicator';
import { useStyles } from './useStyles';

import { useIsMounted } from '../../hooks/useIsMounted';
import { toggleAuthModalState } from '../../services/redux/reducers/common.reducer';
import { getUserIdSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import { useNavigatorOnLine } from '../../services/sw/useNavigatorOnLine';
import EntranceModal from '../EntranceModal/EntranceModal';

const Header = () => {
  const isMounted = useIsMounted();
  const isOnline = useNavigatorOnLine();

  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthModalOpen } = useAppSelector(state => state.common);
  const isUserAuthorized = !!useAppSelector(getUserIdSelector);

  const dispatch = useAppDispatch();

  const openEntranceModalHandler = () => {
    dispatch(toggleAuthModalState());
  };

  const openProfilePageHandler = () => {
    navigate('/profile');
  };

  return (
    <>
      {isAuthModalOpen && <EntranceModal />}
      <div className={classes.wrapper}>
        <Link to={'/'} className={classes.logoLink}>
          <h1 className={classes.logo}>
            <span style={{ color: 'red' }}>Chicago</span>Snake
            <Tooltip title={!isMounted || !isOnline ? 'Offline' : 'Online'}>
              <OnOffIndicator isOnline={isOnline} isSsr={!isMounted} />
            </Tooltip>
          </h1>
          <p className={classes.logoSubtitle}>Yandex Practicum Web Gaming</p>
        </Link>
        <div className={classes.menu}>
          <Link to={'/'} className={classes.button}>
            main
          </Link>
          <Link to={'/forum'} className={classes.button}>
            forum
          </Link>
          <Link to={'/leaderboard'} className={classes.button}>
            leaderboard
          </Link>
          <Link to={'/settings'} className={classes.button}>
            settings
          </Link>

          {!isMounted ? (
            <LoadingButton loading variant="outlined" className={classes.signButton}>
              Profile
            </LoadingButton>
          ) : (
            <Button
              size={'medium'}
              variant={'outlined'}
              onClick={isUserAuthorized ? openProfilePageHandler : openEntranceModalHandler}
              className={classes.signButton}>
              {isUserAuthorized ? 'Profile' : 'Sign in'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
