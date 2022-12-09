import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1, 4),
    margin: theme.spacing(0.5, 0),
    backgroundColor: '#00000008',
    borderRadius: theme.spacing(1),
    fontWeight: 'bold',
  },
  place: {
    marginRight: theme.spacing(2),
  },
  points: {
    marginLeft: 'auto',
  },
  login: {
    marginLeft: theme.spacing(2),
  },
  currentPlayer: {
    backgroundColor: 'rgba(204,198,198,0.63)',
    '& span': {
      fontWeight: 'normal',
      opacity: 0.3,
    },
  },
}));
