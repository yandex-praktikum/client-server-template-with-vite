import { Button } from '@mui/material';

import styles from './RuntimeError.module.scss';

import { ErrorType } from '../../types/errorType';

export function RuntimeError(props: ErrorType) {

  const { error,resetErrorBoundary } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Что-то пошло не так</p>
      <div className={styles.message}>{error.message}</div>
      <Button variant="contained" type="button" onClick={resetErrorBoundary}>
          Обновить
      </Button>
    </div>
  );

}

;

export default RuntimeError;
