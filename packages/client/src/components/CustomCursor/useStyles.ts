import makeStyles from '@material-ui/core/styles/makeStyles';

import { APP_Z_INDEXES } from '../../utils/enums';

export const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: APP_Z_INDEXES.CURSOR,
  },
}));
