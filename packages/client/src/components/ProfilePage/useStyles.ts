import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  userName: {
    margin: 0,
    padding: 0,
    fontFamily: 'Karantina, cursive',
    fontSize: theme.spacing(15),
    textAlign: 'right',
    color: theme.palette.text.primary,
  },
  decorates: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translateX(-50%) translateY(25%)',
    zIndex: -1,
    opacity: 0.1,
  },
  round: {
    width: 700,
    height: 700,
    backgroundColor: 'grey',
    borderRadius: '50%',
  },
}));
