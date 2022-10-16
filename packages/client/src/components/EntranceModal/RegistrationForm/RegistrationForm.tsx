import { Button, TextField } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

const RegistrationForm = () => {
  const classes = useStyles();

  return (
    <form>
      <TextField color={'secondary'} className={classes.input} label={'Name'} fullWidth />
      <TextField color={'secondary'} className={classes.input} label={'Lastname'} fullWidth />
      <TextField color={'secondary'} className={classes.input} label={'Login'} fullWidth />
      <TextField color={'secondary'} className={classes.input} label={'Password'} fullWidth />
      <TextField color={'secondary'} className={classes.input} label={'Repeat password'} fullWidth />
      <Button className={classes.button} variant={'outlined'}>
        Sign up
      </Button>
    </form>
  );
};

export default RegistrationForm;
