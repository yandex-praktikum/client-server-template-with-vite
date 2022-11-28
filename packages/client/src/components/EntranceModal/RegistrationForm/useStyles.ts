import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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
