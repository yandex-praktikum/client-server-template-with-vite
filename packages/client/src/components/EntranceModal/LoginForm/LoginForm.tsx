import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_FORM_DATA } from './constants';
import { useStyles } from './useStyles';

import { type TLoginData } from '../../../../../shared/types';
import { isErrorWithReason } from '../../../../../shared/types/typeGuards/isErrorWithReason';
import { useSnackbarError } from '../../../hooks/useSnackbarError';
import { useLoginMutation } from '../../../services/redux/queries/auth.api';
import { toggleAuthModalState } from '../../../services/redux/reducers/common.reducer';
import { useAppDispatch } from '../../../services/redux/store';
import { Loader } from '../../Loader/Loader';
import { disableAutoFillFormProps } from '../helpers/disableAutoFillForm';

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { SnackbarErrorComp, setError } = useSnackbarError();

  const [formData, setFormData] = React.useState<TLoginData>(DEFAULT_FORM_DATA);

  const [login, { isLoading }] = useLoginMutation();

  const signInHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData).unwrap();
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
      <form onSubmit={signInHandler}>
        <TextField
          name="login"
          value={formData.login}
          onChange={changeInputDataHandler}
          color={'secondary'}
          className={classes.input}
          label={'Login'}
          required
          fullWidth
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
        <div className={classes.buttonCase}>
          <Button className={classes.button} color={'secondary'}>
            Forgot password?
          </Button>
          <Button type={'submit'} className={classes.button} variant={'outlined'}>
            Sign in
          </Button>
        </div>
      </form>
      <SnackbarErrorComp />
    </>
  );
};

export default LoginForm;
