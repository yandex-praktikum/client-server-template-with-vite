import React from 'react';

import { useStyles } from './useStyles';

import { MultiGameCanvas } from '../../canvas/components/MultiGameCanvas/MultiGameCanvas';
import Layout from '../Layout/Layout';

export const MultiGamePage = () => {
  const classes = useStyles();

  return (
    <>
      <Layout />

      <div className={classes.wrapper}>
        <MultiGameCanvas />
      </div>
    </>
  );
};
