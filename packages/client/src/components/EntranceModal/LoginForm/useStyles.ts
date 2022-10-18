import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(2),
  },
  buttonCase: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
}));
