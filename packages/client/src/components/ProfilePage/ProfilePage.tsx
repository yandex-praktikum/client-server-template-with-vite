import React from 'react';

import { useStyles } from './useStyles';

import Layout from '../Layout/Layout';

const ProfilePage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.userName}>Name</p>
        <p className={classes.userName}>LastName</p>
      </div>
      <div className={classes.decorates}>
        <div className={classes.round} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
