import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

import { useAppSelector } from '../../../../../../../hooks/useAppSelector';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { selectUserInfo } from '../../../../../../../store/selectors';

const Authorized: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const { logout } = useAuth();
  const { first_name, second_name, display_name } = userInfo ?? {};

  const nameString = useMemo(
    () => (!display_name ? `${first_name} ${second_name}` : display_name),
    [first_name, second_name, display_name]
  );

  return (
    <>
      <Typography component="div" sx={{ mr: 1 }} color="inherit">
        {nameString}
      </Typography>
      <Button variant="outlined" sx={{ color: 'white' }} onClick={logout}>
        Выйти
      </Button>
      <IconButton sx={{ p: 0 }}>
        <Avatar alt="Your profile picture" src="/" />
      </IconButton>
    </>
  );
};

export default Authorized;
