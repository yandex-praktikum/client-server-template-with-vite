import { TreeItem } from '@mui/lab';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import React, { useState, memo } from 'react';

import { getAuthorInitials } from '../../../utils/getAuthorInitials';
import { getCreatedAtValue } from '../../../utils/getCreatedAtValue';
import { TComment } from '../ForumPage.types';
import { useStyles } from '../useStyles';

type TProps = { data: TComment; canUserWrite: boolean };

const Comment = ({ data, canUserWrite }: TProps) => {
  const { author, content, createdAt, answers, id } = data;
  const [showTextareaComment, setShowTextareaComment] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');

  const classes = useStyles();

  const createdAtValue = getCreatedAtValue(createdAt);
  const authorInitials = getAuthorInitials(author);

  return (
    <div className={classes.comment}>
      <div className={classes.commentAuthor}>
        <Avatar src={author.avatar} sx={{ width: 50, height: 50 }}>
          {authorInitials}
        </Avatar>
        <div className={classes.commentAuthorName}>
          <Typography variant="h6">{[author.second_name, author.first_name].join(' ')}</Typography>
        </div>
        <Typography className={classes.commentCreatedAt} variant="caption" color={'textSecondary'}>
          {createdAtValue}
        </Typography>
      </div>
      <Typography variant={'body1'} className={classes.commentContent}>
        {content}
      </Typography>
      {!showTextareaComment && canUserWrite && (
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
              color='secondary'
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
              <MemoizedComment key={answer.id} data={answer} canUserWrite={canUserWrite} />
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
