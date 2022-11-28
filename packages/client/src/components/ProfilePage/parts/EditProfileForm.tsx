import { Button, DialogActions, TextField } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

import { TSignupData } from '../../../../../shared/types';
import { isErrorWithReason } from '../../../../../shared/types/typeGuards/isErrorWithReason';
import { useSnackbarError } from '../../../hooks/useSnackbarError';
import { useUpdateProfileMutation } from '../../../services/redux/queries/user.api';
import { getUserSelector } from '../../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../../services/redux/store';
import { disableAutoFillFormProps } from '../../EntranceModal/helpers/disableAutoFillForm';
import { DEFAULT_FORM_DATA } from '../../EntranceModal/RegistrationForm/constants';

export const EditProfileForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const classes = useStyles();
  const { data } = useAppSelector(getUserSelector);

  const { SnackbarErrorComp, setError } = useSnackbarError();
  const [updateProfile] = useUpdateProfileMutation();

  const [formData, setFormData] = React.useState<Omit<TSignupData, 'password' | 'repeat_password'>>({
    ...DEFAULT_FORM_DATA,
    ...data,
  });

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditProfile = async () => {
    try {
      await updateProfile({ ...formData, display_name: '' }).unwrap();
      onCloseModal();
    } catch (err) {
      if (isErrorWithReason(err)) {
        setError(err.data.reason);
      } else {
        setError('Something wrong...');
      }
    }
  };

  return (
    <div className={classes.wrapper}>
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
      <DialogActions>
        <Button onClick={onCloseModal} color="secondary">
          CANCEL
        </Button>
        <Button onClick={handleEditProfile} color="secondary" variant="contained">
          EDIT
        </Button>
      </DialogActions>
      <SnackbarErrorComp />
    </div>
  );
};
