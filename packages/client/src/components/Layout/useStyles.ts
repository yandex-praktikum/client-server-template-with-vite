import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    padding: theme.spacing(4, 8),
    overflow: 'hidden',
  },
}));
