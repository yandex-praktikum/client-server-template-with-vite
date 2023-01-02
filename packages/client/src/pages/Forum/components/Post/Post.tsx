import ForumIcon from '@mui/icons-material/Forum';
import {
  Avatar, Divider,
  IconButton,
  ListItem,
  ListItemAvatar, ListItemText,
  Typography,
} from '@mui/material';
import { forumPageProps } from '@src/types/forumPageProps';
import { RoutePaths } from '@src/utils/routes';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Post.module.scss';

const Post: FC<forumPageProps> = ({ id, author, subject, text }) => {
  const navigate = useNavigate();

  const handlePostClick = useCallback(() => {
    navigate(`${RoutePaths.forum}/${id}`);
  }, []);

  return (
    <div className={styles.Post}>
      <ListItem secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <ForumIcon onClick={handlePostClick} />
        </IconButton>
      } alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>А</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={subject}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {author}
              </Typography>
              {` — ${text}`}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default Post;
