import { Alert, Snackbar } from '@mui/material';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';

import { AUTO_HIDE_SNACKBAR_DURATION } from '../consts/settings';
import { SocketContext } from '../services/socket/socket';

type TError = string | null | undefined;

export const useSnackbarError = (): {
  error: TError;
  setError: React.Dispatch<React.SetStateAction<TError>>;
  SnackbarErrorComp: FunctionComponent;
} => {
  const socket = useContext(SocketContext);
  const [error, setError] = useState<TError>(null);

  useEffect(() => {
    socket.on('error', message => {
      setError(message);
    });
    socket.on('disconnect', () => {
      setError('Disconnected');
    });
  }, []);

  const SnackbarErrorComp = () => (
    <Snackbar
      open={!!error}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={AUTO_HIDE_SNACKBAR_DURATION}
      onClose={() => {
        setError(null);
      }}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );

  return {
    SnackbarErrorComp,
    setError,
    error,
  };
};
