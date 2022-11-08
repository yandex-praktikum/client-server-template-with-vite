import { Alert, Snackbar } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';

import { AUTO_HIDE_SNACKBAR_DURATION } from '../consts/settings';

type TError = string | null | undefined;

export const useSnackbarError = (): {
  error: TError;
  setError: React.Dispatch<React.SetStateAction<TError>>;
  SnackbarErrorComp: FunctionComponent;
} => {
  const [error, setError] = useState<TError>(null);

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
