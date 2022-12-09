import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid red',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  },
  logo: {
    margin: 0,
    padding: 0,
    fontSize: theme.spacing(7.5),
    color: theme.palette.secondary.main,
    whiteSpace: 'nowrap',
  },
  logoLink: {
    textDecoration: 'none',

    '&:hover > p': {
      color: 'red',
    },
  },
  logoSubtitle: {
    margin: 0,
    padding: 0,
    fontSize: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  signInButton: {
    padding: theme.spacing(10, 3),
    margin: theme.spacing(10, 3),
    color: 'black',
  },
  button: {
    padding: theme.spacing(1, 3),
    color: 'black',
    textDecoration: 'none',
    textAlign: 'center',
    textTransform: 'capitalize',
    transition: 'background-color 0.3s, color 0.3s',

    '&:hover': {
      color: 'red',
      backgroundColor: 'rgba(0,0,0,.05)',
    },
  },
  signButton: {
    padding: theme.spacing(0.5, 3),
    marginLeft: theme.spacing(2),
    textTransform: 'capitalize',
  },
}));
