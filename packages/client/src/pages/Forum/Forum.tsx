import { List, Divider, Button } from '@mui/material';
import FormikTextField from '@src/components/Formik/FormikTextField';
import { withAccessRights } from '@src/HOCs';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { getThreadList, setThread } from '@src/store/actions/forum';
import { selectThreads } from '@src/store/selectors';
import { IOutletContext } from '@src/utils/OutletContext';
import { Formik, Form, type FormikHelpers } from 'formik';
import { FC, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import Post from './components/Post';
import styles from './Forum.module.scss';
import { validationSchemaThread } from './utils/validationSchema';

type TInitialValue = {
  title: string,
  description: string
};

const Forum: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const threads = useAppSelector(selectThreads);
  const dispatch = useAppDispatch();

  const postList = useMemo(
    () => threads.map(post => {
      return <Post key={post.id} {...post} />;
    }),
    [threads]
  );

  useEffect(() => {
    setPageName('Форум');
    dispatch(getThreadList());
  }, []);

  const initialVal: TInitialValue = {
    title: '',
    description: '',
  };

  const handleOnSubmit = async (values: TInitialValue, props: FormikHelpers<TInitialValue>) => {
    dispatch(setThread(values));
    props.resetForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.forum__body}>
        <List sx={{ width: '100%' }}>{postList}</List>
      </div>
      <Divider> СОЗДАТЬ НОВУЮ ТЕМУ</Divider>
      <div className={styles.forum__footer}>

        <Formik
          initialValues={initialVal}
          validationSchema={validationSchemaThread}
          validateOnChange={false}
          onSubmit={handleOnSubmit}
        >
          {props => {
            const {
              isSubmitting,
              handleSubmit,
            } = props;

            return (
              <Form onSubmit={handleSubmit} className={styles.forum__footer__form}>
                <FormikTextField id="title" name="title" label="Введите заголовок" sx={{ width: 35 / 100 }} />
                <FormikTextField id="description" name="description" label="Введите описание" sx={{ width: 47 / 100 }} />
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  Создать
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default withAccessRights(Forum);
