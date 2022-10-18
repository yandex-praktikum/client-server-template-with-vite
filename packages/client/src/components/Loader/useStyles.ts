import makeStyles from '@material-ui/core/styles/makeStyles';

import { APP_Z_INDEXES } from '../../utils/enums';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .9)',
    zIndex: APP_Z_INDEXES.LOADER_INDEX,
  },
  snakeCase: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  snakePart: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: '#fd1c1c',
    boxShadow: '0 0 5px 5px rgba(0,0,0, .5)',
    opacity: 0,
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: theme.spacing(-11),
    left: 0,
    fontSize: theme.spacing(6),
    color: 'white',
    opacity: 0.05,
    animation: 'textOpacityPulse 2s infinite ease-in-out',
  },
}));
