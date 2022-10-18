import { Button } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

import { toggleAuthModalState } from '../../store/commonSlice';
import { useAppDispatch } from '../../store/hooks';
import Layout from '../Layout/Layout';

const NoAuthPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const openAuthFormHandler = () => {
    dispatch(toggleAuthModalState());
  };

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.subTitle}>Oops..</p>
        <p className={classes.title}>You are not authorized</p>
      </div>
      <p className={classes.text}>
        Please sign in or sign up{' '}
        <Button className={classes.button} onClick={openAuthFormHandler}>
          over here!
        </Button>
      </p>
    </Layout>
  );
};

export default NoAuthPage;
