import React from 'react';

import { useStyles } from './useStyles';

import { MultiGameCanvas } from '../../canvas/components/MultiGameCanvas/MultiGameCanvas';

export const MultiGamePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <MultiGameCanvas />
    </div>
  );
};
