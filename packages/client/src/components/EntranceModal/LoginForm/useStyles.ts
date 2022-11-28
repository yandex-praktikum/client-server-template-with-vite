import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
  buttonCase: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
}));
