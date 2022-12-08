import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import styles from './Login.module.scss';
import { validationSchema } from './utils/validationSchema';

import FormikTextField from '../../components/Formik/FormikTextField';
import { useAuth } from '../../hooks/useAuth';
import { IOutletContext } from '../../utils/OutletContext';

const initialValues = {
  login: '',
  password: '',
};

const Login: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const { login } = useAuth();

  useEffect(() => {
    setPageName('Вход');
  }, []);

  return (
    <div className={styles.wrapper}>
      <Formik<typeof initialValues>
        initialValues={initialValues}
        onSubmit={login}
        validationSchema={validationSchema}
        validateOnChange={false}>
        <Form className={styles.form}>
          <FormikTextField name="login" label="Логин" />
          <FormikTextField name="password" label="Пароль" type="password" />
          <Button variant="contained" type="submit">
            Войти
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
