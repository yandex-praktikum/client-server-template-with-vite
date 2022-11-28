import { styled, Tooltip, Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import { toggleAuthModalState } from '../../services/redux/reducers/common.reducer';
import { getUserIdSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import { useNavigatorOnLine } from '../../services/sw/useNavigatorOnLine';
import EntranceModal from '../EntranceModal/EntranceModal';

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
          <Button
            size={'medium'}
            variant={'outlined'}
            onClick={isUserAuthorized ? openProfilePageHandler : openEntranceModalHandler}
            className={classes.signButton}>
            {isUserAuthorized ? 'Profile' : 'Sign in'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
