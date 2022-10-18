import { Button } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

import useAuthController from '../../services/controllers/useAuthController';
import { useAppSelector } from '../../store/hooks';
import Layout from '../Layout/Layout';

const ProfilePage = () => {
  const classes = useStyles();
  const { first_name, second_name } = useAppSelector(state => state.common.currentUser);
  const { logoutController } = useAuthController();

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.userName}>{first_name}</p>
        <p className={classes.userName}>{second_name}</p>
        <Button className={classes.userName} onClick={logoutController}>
          Logout
        </Button>
      </div>
      <div className={classes.decorates}>
        <div className={classes.round} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
