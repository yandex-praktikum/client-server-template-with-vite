import { List } from '@mui/material';
import { withAccessRights } from '@src/HOCs';
import { IOutletContext } from '@src/utils/OutletContext';
import { FC, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import Message from './components/Message';
import MessageField from './components/MessageField';
import styles from './ForumPage.module.scss';

const ForumPage: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const MOCK = {
    post: { id: 1, author: 'Автор', subject: 'Тема', text: 'Текст' },
    messages: [
      { id: 1, author: 'Автор', text: 'Текст' },
      { id: 2, author: 'Автор', text: 'Текст' },
      { id: 3, author: 'Автор', text: 'Текст' },
    ],
  };
  const messageList = useMemo(
    () =>
      MOCK.messages?.map(message => <Message key={message.id} {...message} />),
    [MOCK.messages]
  );

  useEffect(() => {
    setPageName('Форум');
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.forumPage__body}>
        <List sx={{ width: '100%' }}>{messageList}</List>
      </div>
      <div className={styles.forumPage__footer}>
        <MessageField />
      </div>
    </div>
  );
};

export default withAccessRights(ForumPage);
