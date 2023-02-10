import {
  Avatar, Divider,
  ListItem,
  ListItemAvatar, ListItemText,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { setPickedThread } from '@src/store/reducers';
import type { IForumThreadApiModel } from '@src/types/forumPageProps';
import { RoutePaths } from '@src/utils/routes';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Post.module.scss';

const Post: FC<IForumThreadApiModel> = ({ id, author, title, description }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePostClick = useCallback(async () => {
    await dispatch(setPickedThread({ thread_id: id, title }));
    navigate(`${RoutePaths.forum}/${id}`);
  }, []);

  return (
    <div className={styles.Post}>
      <ListItem onClick={handlePostClick} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>{author.avatar_path ? author.avatar_path : 'А'}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {author.name}
              </Typography>
              {` — ${description}`}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default Post;
