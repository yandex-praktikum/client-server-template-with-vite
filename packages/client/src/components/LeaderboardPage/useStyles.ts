import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const SPACE_BETWEEN = 'space-between';
export const useStyles = makeStyles((theme: Theme) => ({
  leaderBoard: {
    padding: theme.spacing(2),
  },
  leaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: '.2px solid #D9D9D966',
    alignItems: 'flex-end',
  },
  header: {
    display: 'flex',
    justifyContent: SPACE_BETWEEN,
    alignItems: 'flex-end',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  nickNameWrapper: {
    flexBasis: '200px',
    display: 'flex',
    justifyContent: SPACE_BETWEEN,
    alignItems: 'baseline',
  },
  position: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(7),
  },
  nickName: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(4),
  },
  score: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(3.5),
  },
  top5: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(7.5),
    color: theme.palette.text.primary,
    '& span': {
      color: 'red',
      fontSize: theme.spacing(12),
    },
  },
  title: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(7.5),
    color: theme.palette.text.primary,
  },
}));
