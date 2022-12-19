import {
  Avatar, Divider,
  ListItem,
  ListItemAvatar, ListItemText,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import styles from './Message.module.scss';

import { messageProps } from '../../../../types/messageProps';

const Message: FC<messageProps> = ({ author, text }) => {
  return (
    <div className={styles.Post}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>А</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={text}
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
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default Message;
