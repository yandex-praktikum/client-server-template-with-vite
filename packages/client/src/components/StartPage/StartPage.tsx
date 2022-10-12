import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from './useStyles';

import { PreviewAnimationCanvas } from '../../game/preview/PreviewAnimationCanvas';
import Layout from '../Layout/Layout';

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

  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        <div className={classes.menu}>
          <Link to={'/game'} className={classes.menuItem}>
            START
          </Link>
          <p className={classes.menuItem} onClick={handleOpenRules}>
            RULES
          </p>
          <Link to={'/settings'} className={classes.menuItem}>
            SETTINGS
          </Link>
          <Link to={'/leaderboard'} className={classes.menuItem}>
            LEADER BOARD
          </Link>
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
