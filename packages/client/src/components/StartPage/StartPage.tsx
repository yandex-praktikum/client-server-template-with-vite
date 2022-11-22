import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import { useStyles } from './useStyles';

import { PreviewAnimationCanvas } from '../../canvas/components/PreviewAnimationCanvas/PreviewAnimationCanvas';
import { useSnackbarError } from '../../hooks/useSnackbarError';
import { useGetUserQuery } from '../../services/redux/queries/user.api';
import Layout from '../Layout/Layout';

type TMenuItem = {
  itemName: string;
} & (({ type: 'link' } & LinkProps) | { onClick: () => void; type: 'button' });

export const StartPage = () => {
  const classes = useStyles();
  const { data: currentUser } = useGetUserQuery();
  const { setError, SnackbarErrorComp } = useSnackbarError();

  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const toggleOpenRules = useCallback(() => {
    setIsRulesOpen(!isRulesOpen);
  }, [setIsRulesOpen, isRulesOpen]);

  const toggleStartMenu = useCallback(() => {
    if (!currentUser?.id) {
      setError('You will not be included in the ranking of top players while you are not authorized');
    }

    setIsStartMenuOpen(!isStartMenuOpen);
  }, [setIsStartMenuOpen, isStartMenuOpen]);

  const MENU_ITEMS: TMenuItem[] = useMemo(
    () => [
      {
        itemName: 'START',
        onClick: toggleStartMenu,
        type: 'button',
      },
      { itemName: 'RULES', onClick: toggleOpenRules, type: 'button' },
    ],
    [toggleStartMenu]
  );

  const START_MENU_ITEMS: TMenuItem[] = useMemo(
    () => [
      {
        itemName: 'SINGLE PLAYER',
        to: '/game',
        type: 'link',
      },
      {
        itemName: 'MULTIPLAYER',
        to: currentUser?.id ? '/create-or-join-game' : '#',
        type: 'link',
        onClick: () => {
          if (!currentUser?.id) {
            setError('Multiplayer is available only for authorized users');
          }
        },
      },
      {
        itemName: 'BACK',
        onClick: toggleStartMenu,
        type: 'button',
      },
    ],
    [toggleStartMenu]
  );

  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.title}>SNAKE GAME</div>
        <div className={classes.menu}>
          {(isStartMenuOpen ? START_MENU_ITEMS : MENU_ITEMS).map(menuItem =>
            menuItem.type === 'link' ? (
              <Link key={menuItem.itemName} to={menuItem.to} className={classes.menuItem} onClick={menuItem.onClick}>
                {menuItem.itemName}
              </Link>
            ) : (
              <p key={menuItem.itemName} className={classes.menuItem} onClick={menuItem.onClick}>
                {menuItem.itemName}
              </p>
            )
          )}
        </div>
      </div>
      <div className={classes.previewCanvas}>
        <PreviewAnimationCanvas />
      </div>
      <Dialog open={isRulesOpen} onClose={toggleOpenRules}>
        <DialogTitle>RULES</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Eat items and grow to the maximum possible length. You have 1 minute, after which the game will end. Don't
            crash into the walls otherwise the game will end early.
          </DialogContentText>
          <DialogContentText>Be the best and you will see yourself on the Leaderboard.</DialogContentText>
          <DialogContentText>Good luck!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpenRules} color="secondary" variant="contained">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarErrorComp />
    </Layout>
  );
};
