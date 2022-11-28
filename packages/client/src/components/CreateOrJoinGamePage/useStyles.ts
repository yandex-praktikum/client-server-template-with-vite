import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    maxWidth: '80%',
    margin: '0 auto',
    padding: theme.spacing(4),
  },
  head: {
    textAlign: 'center',
    marginTop: 0,
  },
  block: {
    width: '500px',
    margin: '0 auto 20px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    width: '100px',
    display: 'block',
  },
  joinBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
