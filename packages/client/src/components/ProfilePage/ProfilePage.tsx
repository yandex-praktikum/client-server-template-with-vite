import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

import { ChangePasswordForm } from './parts/ChangePasswordForm';
import { EditProfileForm } from './parts/EditProfileForm';
import { useStyles } from './useStyles';

import { RESOURCES_URL } from '../../../../shared/consts/common';
import { isErrorWithReason } from '../../../../shared/types/typeGuards/isErrorWithReason';
import { useSnackbarError } from '../../hooks/useSnackbarError';
import { useLogoutMutation } from '../../services/redux/queries/auth.api';
import { useUpdateAvatarMutation } from '../../services/redux/queries/user.api';
import { getUserSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../services/redux/store';
import { useNavigatorOnLine } from '../../services/sw/useNavigatorOnLine';
import { Layout } from '../Layout/Layout';

export const ProfilePage = () => {
  const classes = useStyles();
  const isOnline = useNavigatorOnLine();

  const { SnackbarErrorComp, setError } = useSnackbarError();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const { data } = useAppSelector(getUserSelector);

  const [logout] = useLogoutMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  const { first_name = '', second_name = '', avatar = '', login = '', phone = '', email = '' } = data || {};

  const logoutHandler = () => {
    logout();
  };

  const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedAvatar = event.target.files;
    const file = uploadedAvatar?.[0];

    if (file) {
      const form = new FormData();
      form.append('avatar', file);

      try {
        await updateAvatar(form).unwrap();
        setIsEditProfileOpen(false);
      } catch (err) {
        if (isErrorWithReason(err)) {
          setError(err.data.reason);
        } else {
          setError('Something wrong...');
        }
      }
    }
  };

  return (
    <Layout>
      <div className={classes.wrapper}>
        <div className={classes.userName}>{first_name}</div>
        <div className={classes.userName}>{second_name}</div>
      </div>
      <Avatar className={classes.avatar} src={RESOURCES_URL + avatar}>
        <PersonIcon className={classes.personIcon} />
      </Avatar>
      <Button className={classes.uploadBtn} color="info" variant="contained" component="label" disabled={!isOnline}>
        Upload
        <input hidden accept="image/*" type="file" onChange={handleChangeAvatar} />
      </Button>

      <div className={classes.userInfo}>{login}</div>
      <div className={classes.userInfo}>{email}</div>
      <div className={classes.userInfo}>{phone}</div>

      <div className={classes.roundChangeProfile}>
        <Button
          className={classes.btnChangeProfile}
          variant="contained"
          color="secondary"
          disabled={!isOnline}
          onClick={() => {
            setIsEditProfileOpen(true);
          }}>
          Edit profile
        </Button>
        <Button
          className={classes.btnChangePassword}
          variant="contained"
          color="secondary"
          disabled={!isOnline}
          onClick={() => {
            setIsChangePasswordOpen(true);
          }}>
          Change password
        </Button>
      </div>
      <div className={classes.roundLogout}>
        <Button className={classes.btnLogout} variant="contained" onClick={logoutHandler} disabled={!isOnline}>
          Logout
        </Button>
      </div>

      <Dialog open={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)}>
        <DialogTitle>EDIT PROFILE</DialogTitle>
        <DialogContent>
          <EditProfileForm onCloseModal={() => setIsEditProfileOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}>
        <DialogTitle>CHANGE PASSWORD</DialogTitle>
        <DialogContent>
          <ChangePasswordForm onCloseModal={() => setIsChangePasswordOpen(false)} />
        </DialogContent>
      </Dialog>
      <SnackbarErrorComp />
    </Layout>
  );
};
