import { type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    backgroundColor: '#00000008',
    borderRadius: theme.spacing(1),
  },
  title: {
    fontSize: 80,
    lineHeight: 0.7,
    color: 'red',
  },
  subTitle: {
    margin: theme.spacing(2, 0, 0),
    fontSize: 30,
    lineHeight: 1,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));
