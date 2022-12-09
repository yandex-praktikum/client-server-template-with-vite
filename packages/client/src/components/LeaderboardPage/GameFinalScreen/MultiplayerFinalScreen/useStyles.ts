import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#00000008',
    borderRadius: theme.spacing(1),
  },
}));
