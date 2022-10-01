import { Typography } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { Avatar, Button, TextField } from '@mui/material';
import React, { useState, memo } from 'react';

import { TComment } from '../ForumPage.types';
import { useStyles } from '../useStyles';

type TProps = { data: TComment };

const Comment = ({ data }: TProps) => {
  const { author, content, createdAt, answers, id } = data;
  const [showTextareaComment, setShowTextareaComment] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');

  const classes = useStyles();

  const createdAtValue = createdAt.slice(0, 10).split('-').reverse().join('.');
  const authorInitials = author.firstName.slice(0, 1) + author.lastName.slice(0, 1);

  return (
    <div className={classes.comment}>
      <div className={classes.commentAuthor}>
        <Avatar src={author.avatar} sx={{ width: 50, height: 50 }}>
          {authorInitials}
        </Avatar>
        <div className={classes.commentAuthorName}>
          <Typography variant="h6">{[author.lastName, author.firstName].join(' ')}</Typography>
        </div>
        <Typography className={classes.commentCreatedAt} variant="caption" color={'textSecondary'}>
          {createdAtValue}
        </Typography>
      </div>
      <Typography variant={'body1'} className={classes.commentContent}>
        {content}
      </Typography>
      {!showTextareaComment && (
        <Button
          variant={'text'}
          color={'info'}
          size={'small'}
          onClick={() => {
            setShowTextareaComment(true);
          }}
          className={classes.btn}>
          Reply
        </Button>
      )}
      {showTextareaComment && (
        <>
          <div className={classes.textareaAnswer}>
            <TextField
              fullWidth
              label="Write an answer"
              multiline
              rows={3}
              size={'small'}
              value={commentValue}
              onChange={e => {
                setCommentValue(e.target.value);
              }}
            />
          </div>
          <div className={classes.actions}>
            <Button
              variant={'text'}
              color={'error'}
              size={'small'}
              onClick={() => {
                setShowTextareaComment(false);
              }}
              className={classes.btn}>
              Cancel
            </Button>
            <Button variant={'text'} color={'info'} size={'small'} disabled={!commentValue} className={classes.btn}>
              Send
            </Button>
          </div>
        </>
      )}
      {!!answers?.length && (
        <div className={classes.answers}>
          <TreeItem nodeId={id.toString()} label={`Ответы: ${answers.length}`}>
            {answers?.map(answer => (
              <MemoizedComment data={answer} />
            ))}
          </TreeItem>
        </div>
      )}
    </div>
  );
};

function isEqual(prev: TProps, next: TProps) {
  return prev.data.id === next.data.id;
}

export const MemoizedComment = memo(Comment, isEqual);
