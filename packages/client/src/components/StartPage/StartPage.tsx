import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

import { PreviewAnimationCanvas } from '../../game/preview/PreviewAnimationCanvas';
import Layout from '../Layout/Layout';

type TMenuItem = {
  itemName: string;
} & ({ to: string; type: 'link' } | { onClick: () => void; type: 'button' });

export const StartPage = () => {
  const classes = useStyles();
  const [rulesOpen, setRulesOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleOpenRules = () => {
    setRulesOpen(true);
  };

  const handleCloseRules = () => {
    setRulesOpen(false);
  };

  const handleStartClick = () => {
    setIsStartMenuOpen(true);
  };

  const handleBackClick = () => {
    setIsStartMenuOpen(false);
  };

  const MENU_ITEMS: TMenuItem[] = [
    {
      itemName: 'START',
      onClick: handleStartClick,
      type: 'button',
    },
    { itemName: 'RULES', onClick: handleOpenRules, type: 'button' },
    { itemName: 'SETTINGS', to: '/settings', type: 'link' },
    { itemName: 'LEADER BOARD', to: '/leaderboard', type: 'link' },
  ];

  const START_MENU_ITEMS: TMenuItem[] = [
    {
      itemName: 'SINGLE PLAYER',
      to: '/game',
      type: 'link',
    },
    {
      itemName: 'MULTIPLAYER',
      to: '/game-online',
      type: 'link',
    },
    {
      itemName: 'BACK',
      onClick: handleBackClick,
      type: 'button',
    },
  ];

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
      <Dialog open={rulesOpen} onClose={handleCloseRules}>
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
          <Button onClick={handleCloseRules} color="secondary" variant="contained">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
