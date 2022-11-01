import makeStyles from '@material-ui/core/styles/makeStyles';

import { APP_Z_INDEXES } from '../../utils/enums';

export const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'fixed',
    width: 50,
    height: 50,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: APP_Z_INDEXES.CURSOR,
  },
  cursorAnimation: {
    animation: 'cursorRotate 0.3s ease-in-out',
    animationIterationCount: 1,
  },
}));
