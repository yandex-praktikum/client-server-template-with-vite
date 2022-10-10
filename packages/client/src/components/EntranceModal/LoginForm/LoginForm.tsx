import { Button, TextField } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

const LoginForm = () => {
  const classes = useStyles();

  return (
    <form>
      <TextField color={'secondary'} className={classes.input} label={'Login'} fullWidth />
      <TextField color={'secondary'} className={classes.input} label={'Password'} fullWidth />
      <div className={classes.buttonCase}>
        <Button className={classes.button} color={'secondary'}>
          Forgot password?
        </Button>
        <Button className={classes.button} variant={'outlined'}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
