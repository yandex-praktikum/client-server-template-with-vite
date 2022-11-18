import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: '80%',
    margin: '0 auto',
    padding: theme.spacing(4),
  },
  head: {
    textAlign: 'center',
    marginTop: 0,
  },
  block: {
    width: '500px',
    margin: '0 auto 20px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    width: '100px',
    display: 'block',
  },
  joinBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
