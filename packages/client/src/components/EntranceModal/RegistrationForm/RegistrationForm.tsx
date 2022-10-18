import { Button, TextField } from '@mui/material';
import React from 'react';

import { DEFAULT_FORM_DATA } from './constants';
import { useStyles } from './useStyles';

import { TAuthApiSignUp } from '../../../services/api/useAuthApi';
import useAuthController from '../../../services/controllers/useAuthController';

const RegistrationForm = () => {
  const classes = useStyles();
  const { signUpController } = useAuthController();
  const [formData, setFormData] = React.useState<TAuthApiSignUp>(DEFAULT_FORM_DATA);

  const signUpHandler = (e: React.FormEvent) => {
    e.preventDefault();
    signUpController(formData);
  };

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={signUpHandler}>
      <TextField
        name="first_name"
        value={formData.first_name}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Name'}
        required
        fullWidth
      />
      <TextField
        name="second_name"
        value={formData.second_name}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Lastname'}
        required
        fullWidth
      />
      <TextField
        name="login"
        value={formData.login}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Login'}
        required
        fullWidth
      />
      <TextField
        name="email"
        value={formData.email}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Email'}
        required
        fullWidth
      />
      <TextField
        name="phone"
        value={formData.phone}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Phone'}
        required
        fullWidth
      />
      <TextField
        name="password"
        value={formData.password}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Password'}
        required
        fullWidth
      />
      <TextField
        name="repeat_password"
        value={formData.repeat_password}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Repeat password'}
        required
        fullWidth
      />
      <Button className={classes.button} variant={'outlined'} type={'submit'}>
        Sign up
      </Button>
    </form>
  );
};

export default RegistrationForm;
