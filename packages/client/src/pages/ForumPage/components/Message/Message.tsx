import ForumIcon from '@mui/icons-material/Forum';
import {
  Avatar, Divider,
  IconButton,
  ListItem,
  ListItemAvatar, ListItemText,
  Typography,
} from '@mui/material';
import type { IForumCommentApiModel } from '@src/types/forumPageProps';
import { FC } from 'react';

import styles from './Message.module.scss';

const Message: FC<IForumCommentApiModel> = ({ id, author, content }) => {
  return (
    <div className={styles.Post}>
      <ListItem alignItems="flex-start" secondaryAction={
        <IconButton edge="end" onClick={() => console.log(`send reply for ${id} message`)}>
          <ForumIcon />
        </IconButton>
      }>
        <ListItemAvatar>
          <Avatar>А</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={content}
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
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default Message;
