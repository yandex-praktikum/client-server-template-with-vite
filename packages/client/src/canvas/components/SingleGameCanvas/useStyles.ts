import { makeStyles } from '@mui/styles';

import CursorPng from '../../../assets/image/cursor.png';

export const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none',
  },
  mainCanvas: {
    position: 'absolute',
    cursor: `url(${CursorPng}) 24 24, default`,
  },
}));
