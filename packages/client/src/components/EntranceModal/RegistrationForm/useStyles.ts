import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    display: 'block',
    margin: theme.spacing(4, 0, 0, 'auto'),
    fontSize: 18,
    textTransform: 'none',
  },
}));
