import makeStyles from '@material-ui/core/styles/makeStyles';

// TODO: поправить цвета игроков + выровнить игроков по центру (paper)
export const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: '80%',
    margin: '0 auto',
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  head: {
    textAlign: 'center',
    marginTop: 0,
  },
  code: {
    color: 'red',
  },
  players: {
    color: 'gray',
    textAlign: 'center',
  },
  startBtn: {
    marginTop: theme.spacing(2),
    width: '50%',
  },
  table: {
    marginBottom: theme.spacing(2),
    width: '800px',
  },
  host: {
    color: 'red',
  },
  you: {
    color: 'gray',
  },
}));
