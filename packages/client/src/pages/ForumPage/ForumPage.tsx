import { List } from '@mui/material';
import { withAccessRights } from '@src/HOCs';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { getCommentsListForThread } from '@src/store/actions/forum';
import { selectComments, selectPickedThread } from '@src/store/selectors';
import { IOutletContext } from '@src/utils/OutletContext';
import { FC, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import Message from './components/Message';
import MessageField from './components/MessageField';
import styles from './ForumPage.module.scss';

const ForumPage: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const pickedThreadInfo = useAppSelector(selectPickedThread);
  const comments = useAppSelector(selectComments);
  const { title } = pickedThreadInfo ?? {};

  const dispatch = useAppDispatch();

  const messageList = useMemo(
    () => {
      if (comments.length === 0) {
        return <div>Комментариев по данной теме не найдено</div>;
      }
      else {
        return (comments.map(message => <Message key={message.id} {...message} />));
      }
    },
    [comments]
  );

  useEffect(() => {
    setPageName(`Тема: ${title}`);
    dispatch(getCommentsListForThread());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.forumPage__body}>
        <List sx={{ width: '100%' }}>{
          messageList
        }</List>
      </div>
      <div className={styles.forumPage__footer}>
        <MessageField />
      </div>
    </div>
  );
};

export default withAccessRights(ForumPage);
