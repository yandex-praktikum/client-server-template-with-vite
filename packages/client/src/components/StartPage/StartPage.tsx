import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { MenuItem } from '@mui/material/';
import React, { useState } from 'react';

import { useStyles } from './useStyles';

import { PreviewAnimationCanvas } from '../../game/preview/PreviewAnimationCanvas';
import Layout from '../Layout/Layout';

const onChangeRoute = (route: string) => {
  // TODO: убрать, когда будет подключен React Router
  // https://trello.com/c/IgnIMxX2/
  // 8-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D1%8F%D0%B5%D1%82
  // -%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83-%D1%81-react-router
  window.location.pathname = route;
};

export const StartPage = () => {
  const classes = useStyles();
  const [rulesOpen, setRulesOpen] = useState(false);

  const handleOpenRules = () => {
    setRulesOpen(true);
  };

  const handleCloseRules = () => {
    setRulesOpen(false);
  };

  const gameResult = window.location.hash;
  const isVictory = gameResult === '#victory';
  const isGameOver = gameResult === '#gameover';
  const title = isVictory ? 'VICTORY!' : isGameOver ? 'GAME OVER' : 'SNAKE GAME';

  const onStart = () => onChangeRoute('/game');
  const onClickSettings = () => onChangeRoute('/settings');
  const onClickLeaderBoard = () => onChangeRoute('/leader-board');

  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        <div className={classes.menu}>
          <MenuItem className={classes.menuItem} onClick={onStart}>
            START
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={handleOpenRules}>
            RULES
          </MenuItem>
          <MenuItem disabled className={classes.menuItem} onClick={onClickSettings}>
            SETTINGS
          </MenuItem>
          <MenuItem disabled className={classes.menuItem} onClick={onClickLeaderBoard}>
            LEADER BOARD
          </MenuItem>
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
