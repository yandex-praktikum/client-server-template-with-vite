import React, { useState } from 'react'
import {
  ExpandMore as ExpandMoreIcon,
  Comment as CommentIcon,
  ChevronRight as ChevronRightIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'
import { Avatar, Button, ListItemButton, TextField } from '@mui/material'
import { TreeView } from '@material-ui/lab'
import { List, Typography } from '@material-ui/core'

import { useStyles } from './useStyles'
import Layout from '../Layout/Layout'
import { TTheme } from './ForumPage.types'
import { TEMP_DATA } from './tempData'
import { MemoizedComment } from './parts/Comment'

export const ForumPage = () => {
  const classes = useStyles()
  const [selectedTheme, setSelectedTheme] = useState<TTheme | null>(null)
  const [commentValue, setCommentValue] = useState<string>('')

  const createdAtValue = selectedTheme?.createdAt
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')
  const authorInitials =
    (selectedTheme?.author.firstName.slice(0, 1) || '') +
    (selectedTheme?.author.lastName.slice(0, 1) || '')

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
                {item.title}
                <div className={classes.commentCount}>
                  <CommentIcon color={'info'} /> {item.discussions?.length || 0}
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
              <Typography
                color={'textSecondary'}
                variant="body2"
                align={'right'}>
                Created at:{' '}
                <Typography variant="inherit">{createdAtValue}</Typography>
              </Typography>
              <div className={classes.themeTitle}>
                <div className={classes.themeAuthor}>
                  <Avatar
                    src={selectedTheme.author.avatar}
                    sx={{ width: 100, height: 100 }}>
                    {authorInitials}
                  </Avatar>
                  <Typography variant="body1">
                    {selectedTheme.author.lastName}
                  </Typography>
                  <Typography variant="body1">
                    {selectedTheme.author.firstName}
                  </Typography>
                </div>
                <Typography variant="h3">{selectedTheme.title}</Typography>
              </div>
              <Typography className={classes.themeContent} variant={'body1'}>
                {selectedTheme.content}
              </Typography>
              <div className={classes.comments}>
                <Typography variant={'h6'}>
                  Comments: {selectedTheme.discussions?.length || 0}
                </Typography>
                <TextField
                  label="Write a comment"
                  multiline
                  rows={3}
                  size={'small'}
                  value={commentValue}
                  onChange={e => {
                    setCommentValue(e.target.value)
                  }}
                />
                <Button
                  variant={'text'}
                  color={'info'}
                  size={'small'}
                  disabled={!commentValue}
                  className={classes.btn}>
                  Send
                </Button>
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}>
                  {selectedTheme.discussions?.map(comment => (
                    <MemoizedComment key={comment.id} data={comment} />
                  ))}
                </TreeView>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
