import { Button, DialogActions, TextField } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

import { TChangePasswordData } from '../../../../../shared/types/apiTypes/changePassword';
import { isErrorWithReason } from '../../../../../shared/types/typeGuards/isErrorWithReason';
import { useSnackbarError } from '../../../hooks/useSnackbarError';
import { useChangePasswordMutation } from '../../../services/redux/queries/user.api';
import { disableAutoFillFormProps } from '../../EntranceModal/helpers/disableAutoFillForm';

export const ChangePasswordForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const classes = useStyles();
  const { SnackbarErrorComp, setError } = useSnackbarError();
  const [changePassword] = useChangePasswordMutation();

  const [formData, setFormData] = React.useState<TChangePasswordData>({
    oldPassword: '',
    newPassword: '',
  });

  const changeInputDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditProfile = async () => {
    try {
      await changePassword(formData).unwrap();
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
        name="oldPassword"
        value={formData.oldPassword}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'Old password'}
        required
        fullWidth
        type="password"
        inputProps={{ ...disableAutoFillFormProps, autoComplete: 'new-password' }}
      />
      <TextField
        name="newPassword"
        value={formData.newPassword}
        onChange={changeInputDataHandler}
        color={'secondary'}
        className={classes.input}
        label={'New password'}
        required
        fullWidth
        type="password"
        inputProps={{ ...disableAutoFillFormProps, autoComplete: 'new-password' }}
      />
      <DialogActions>
        <Button onClick={onCloseModal} color="secondary">
          CANCEL
        </Button>
        <Button onClick={handleEditProfile} color="secondary" variant="contained">
          CHANGE
        </Button>
      </DialogActions>
      <SnackbarErrorComp />
    </div>
  );
};
