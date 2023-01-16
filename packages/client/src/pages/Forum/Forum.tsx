import { List } from '@mui/material';
import { withAccessRights } from '@src/HOCs';
import { IOutletContext } from '@src/utils/OutletContext';
import { FC, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import Post from './components/Post';
import styles from './Forum.module.scss';

const Forum: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const MOCK = {
    posts: [
      { id: 1, author: 'Автор', subject: 'Тема', text: 'Текст' },
      { id: 2, author: 'Автор', subject: 'Тема', text: 'Текст' },
      { id: 3, author: 'Автор', subject: 'Тема', text: 'Текст' },
    ],
  };
  const postList = useMemo(
    () => MOCK.posts?.map(post => <Post key={post.id} {...post} />),
    [MOCK.posts]
  );

  useEffect(() => {
    setPageName('Форум');
  }, []);

  return (
    <div className={styles.wrapper}>
      <List sx={{ width: '100%' }}>{postList}</List>
    </div>
  );
};

export default withAccessRights(Forum);
