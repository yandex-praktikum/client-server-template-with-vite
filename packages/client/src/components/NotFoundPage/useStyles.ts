import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15vh',
  },
  title: {
    margin: 0,
    fontSize: theme.spacing(25),
    lineHeight: 1,
  },
  subTitle: {
    fontSize: theme.spacing(10),
    color: 'red',
  },
  text: {
    textAlign: 'center',
    fontSize: theme.spacing(3),
  },
  link: {
    color: 'red',
  },
}));
