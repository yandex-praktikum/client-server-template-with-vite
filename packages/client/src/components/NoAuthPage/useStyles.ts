import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15vh',
  },
  title: {
    margin: 0,
    fontFamily: 'Karantina, cursive',
    fontSize: theme.spacing(25),
    lineHeight: 1,
  },
  subTitle: {
    fontFamily: 'Karantina, cursive',
    fontSize: theme.spacing(10),
    color: 'red',
  },
  text: {
    textAlign: 'center',
    fontSize: theme.spacing(3),
  },
  button: {
    fontSize: theme.spacing(3),
    textTransform: 'lowercase',
    color: 'red',
  },
}));
