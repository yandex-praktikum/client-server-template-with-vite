import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { Link, type To } from 'react-router-dom';

import { useStyles } from './useStyles';

import { PreviewAnimationCanvas } from '../../canvas/components/PreviewAnimationCanvas/PreviewAnimationCanvas';
import Layout from '../Layout/Layout';

type TMenuItem = {
  itemName: string;
} & ({ to: To; type: 'link' } | { onClick: () => void; type: 'button' });

export const StartPage = () => {
  const classes = useStyles();
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const toggleOpenRules = useCallback(() => {
    setIsRulesOpen(!isRulesOpen);
  }, [setIsRulesOpen, isRulesOpen]);

  const toggleStartMenu = useCallback(() => {
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
      { itemName: 'SETTINGS', to: '/settings', type: 'link' },
      { itemName: 'LEADER BOARD', to: '/leaderboard', type: 'link' },
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
        to: '/create-or-join-game',
        type: 'link',
      },
      {
        itemName: 'BACK',
        onClick: toggleStartMenu,
        type: 'button',
      },
    ],
    [toggleStartMenu]
  );

  const gameResult = window.location.hash;
  const isVictory = gameResult === '#victory';
  const isGameOver = gameResult === '#gameover';
  const title = isVictory ? 'VICTORY!' : isGameOver ? 'GAME OVER' : 'SNAKE GAME';

  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        <div className={classes.menu}>
          {(isStartMenuOpen ? START_MENU_ITEMS : MENU_ITEMS).map(menuItem =>
            menuItem.type === 'link' ? (
              <Link key={menuItem.itemName} to={menuItem.to} className={classes.menuItem}>
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
    </Layout>
  );
};
