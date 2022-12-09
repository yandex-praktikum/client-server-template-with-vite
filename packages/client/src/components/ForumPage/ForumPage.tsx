import {
  ExpandMore as ExpandMoreIcon,
  Comment as CommentIcon,
  ChevronRight as ChevronRightIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { TreeView } from '@mui/lab';
import { Avatar, Button, List, ListItemButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { TTheme } from './ForumPage.types';
import { MemoizedComment } from './parts/Comment';
import { TEMP_DATA } from './tempData';
import { useStyles } from './useStyles';

import { getUserIdSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppSelector } from '../../services/redux/store';
import { useNavigatorOnLine } from '../../services/sw/useNavigatorOnLine';
import { getAuthorInitials } from '../../utils/getAuthorInitials';
import { getCreatedAtValue } from '../../utils/getCreatedAtValue';
import { Layout } from '../Layout/Layout';

export const ForumPage = () => {
  const classes = useStyles();

  const isUserAuthorized = !!useAppSelector(getUserIdSelector);

  const isOnline = useNavigatorOnLine();

  const canUserWrite = isUserAuthorized && isOnline;

  const [selectedTheme, setSelectedTheme] = useState<TTheme | null>(null);
  const [commentValue, setCommentValue] = useState<string>('');

  const createdAtValue = selectedTheme?.createdAt ? getCreatedAtValue(selectedTheme.createdAt) : '';
  const authorInitials = selectedTheme?.author ? getAuthorInitials(selectedTheme.author) : '';

  return (
    <Layout>
      <div className={classes.wrapper}>
        <List className={classes.themeList}>
          {TEMP_DATA.map(item => (
            <ListItemButton
              selected={selectedTheme?.title === item.title}
              key={item.id}
              onClick={setSelectedTheme.bind(null, item)}>
              <div className={classes.themeItem}>
                <div> {item.title}</div>
                <div className={classes.commentCount}>
                  <CommentIcon fontSize="small" color="secondary" /> {item.discussions?.length || 0}
                </div>
              </div>
            </ListItemButton>
          ))}
        </List>
        {!selectedTheme ? (
          <div className={classes.emptyBlock}>
            <ArrowBackIcon fontSize="large" fontVariant={'outlined'} />
            <Typography variant="h4">Сhoose a topic</Typography>
          </div>
        ) : (
          <>
            <div className={classes.themeContainer}>
              <Typography component={'div'} color={'textSecondary'} variant="body2" align={'right'}>
                Created at:{' '}
                <Typography component={'span'} variant="inherit">
                  {createdAtValue}
                </Typography>
              </Typography>
              <div className={classes.themeTitle}>
                <div className={classes.themeAuthor}>
                  <Avatar src={selectedTheme.author.avatar} sx={{ width: 100, height: 100 }}>
                    {authorInitials}
                  </Avatar>
                  <Typography variant="body1">{selectedTheme.author.second_name}</Typography>
                  <Typography variant="body1">{selectedTheme.author.first_name}</Typography>
                </div>
                <Typography variant="h3">{selectedTheme.title}</Typography>
              </div>
              <Typography className={classes.themeContent} variant={'body1'}>
                {selectedTheme.content}
              </Typography>
              <div className={classes.comments}>
                <Typography variant={'h6'}>Comments: {selectedTheme.discussions?.length || 0}</Typography>
                {canUserWrite && (
                  <TextField
                    color="secondary"
                    label="Write a comment"
                    multiline
                    rows={3}
                    size={'small'}
                    value={commentValue}
                    onChange={e => {
                      setCommentValue(e.target.value);
                    }}
                  />
                )}
                {canUserWrite && (
                  <Button
                    variant={'text'}
                    color={'info'}
                    size={'small'}
                    disabled={!commentValue}
                    className={classes.btn}>
                    Send
                  </Button>
                )}
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                  {selectedTheme.discussions?.map(comment => (
                    <MemoizedComment key={comment.id} data={comment} canUserWrite={canUserWrite} />
                  ))}
                </TreeView>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
