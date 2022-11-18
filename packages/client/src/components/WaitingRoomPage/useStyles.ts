import makeStyles from '@material-ui/core/styles/makeStyles';

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
  tableContainer: {
    margin: `0 auto ${theme.spacing(2)}px`,
    width: '800px',
    maxWidth: '100%',
  },
  table: {
    minWidth: 650,
  },
  host: {
    color: 'red',
  },
  you: {
    color: 'gray',
  },
  login: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  alert: {
    width: 'fit-content',
    margin: '0 auto',
  },
}));
