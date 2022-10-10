import makeStyles from '@material-ui/core/styles/makeStyles';

const FONT_FAMILY = 'Karantina, cursive';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .8)',
    zIndex: 1000,
  },
  modalBody: {
    position: 'relative',
    width: theme.spacing(70),
    padding: theme.spacing(6, 4, 8),
    marginLeft: 'auto',
    height: '100%',
    backgroundColor: 'white',
  },
  headingCase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(6),
  },
  title: {
    margin: 0,
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: theme.spacing(8),
    lineHeight: 1,
  },
  exitButton: {
    color: 'red',
  },
  exitIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  changeFormCase: {
    position: 'absolute',
    bottom: theme.spacing(8),
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  changeFormButton: {
    fontSize: 18,
    textTransform: 'none',
  },
}));
