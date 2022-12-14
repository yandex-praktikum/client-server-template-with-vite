import React from 'react';

import { useStyles } from './useStyles';

import { SingleGameCanvas } from '../../canvas/components/SingleGameCanvas/SingleGameCanvas';

export const GamePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <SingleGameCanvas />
    </div>
  );
};
