import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_FORM_DATA } from './constants';
import { useStyles } from './useStyles';

import type { TSignupData } from '../../../../../shared/types';
import { isErrorWithReason } from '../../../../../shared/types/typeGuards/isErrorWithReason';
import { useSnackbarError } from '../../../hooks/useSnackbarError';
import { useSignupMutation } from '../../../services/redux/queries/auth.api';
import { toggleAuthModalState } from '../../../services/redux/reducers/common.reducer';
import { useAppDispatch } from '../../../services/redux/store';
import Loader from '../../Loader/Loader';
import { disableAutoFillFormProps } from '../helpers/disableAutoFillForm';

const RegistrationForm = () => {
  const classes = useStyles();
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { SnackbarErrorComp, setError } = useSnackbarError();

  const [formData, setFormData] = React.useState<TSignupData>(DEFAULT_FORM_DATA);

  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.repeat_password) {
      setError('Passwords do not match');

      return;
    }

    try {
      await signup(formData).unwrap();
      await dispatch(toggleAuthModalState());
      navigate('/');
    } catch (err) {
      if (isErrorWithReason(err)) {
        setError(err.data.reason);
      } else {
        setError('Something wrong...');
      }
    }
  };

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      {isLoading && <Loader />}

      <form onSubmit={signUpHandler} noValidate>
        <TextField
          name="first_name"
          value={formData.first_name}
          onChange={changeInputDataHandler}
          color={'secondary'}
          className={classes.input}
          label={'Name'}
          required
          fullWidth
          type="text"
          inputProps={disableAutoFillFormProps}
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
          type="text"
          inputProps={disableAutoFillFormProps}
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
          type="text"
          inputProps={disableAutoFillFormProps}
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
          type="text"
          inputProps={disableAutoFillFormProps}
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
          type="text"
          inputProps={disableAutoFillFormProps}
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
          type="password"
          inputProps={{ ...disableAutoFillFormProps, autoComplete: 'new-password' }}
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
          type="password"
          inputProps={{ ...disableAutoFillFormProps, autoComplete: 'new-password' }}
        />
        <Button className={classes.button} variant={'outlined'} type={'submit'}>
          Sign up
        </Button>
      </form>
      <SnackbarErrorComp />
    </>
  );
};

export default RegistrationForm;
