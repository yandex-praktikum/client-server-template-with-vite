import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const SPACE_BETWEEN = 'space-between';
export const useStyles = makeStyles((theme: Theme) => ({
  leaderBoard: {
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    justifyContent: SPACE_BETWEEN,
    alignItems: 'flex-end',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  plug: {
    fontSize: theme.spacing(6),
    textAlign: 'center',
    '& span': {
      color: 'red',
    },
  },
}));
