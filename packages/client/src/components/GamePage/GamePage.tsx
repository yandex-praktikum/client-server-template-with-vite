import React from 'react';

import { useStyles } from './useStyles';

import { SingleGameCanvas } from '../../canvas/components/SingleGameCanvas/SingleGameCanvas';
import Layout from '../Layout/Layout';

export const GamePage = () => {
  const classes = useStyles();

  return (
    <>
      <Layout />

      <div className={classes.wrapper}>
        <SingleGameCanvas />
      </div>
    </>
  );
};
