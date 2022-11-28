import { type Theme } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '70px',
    margin: '32px 0',
    color: grey['50'],
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
    padding: '4px 20px',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '100px',
  },
  menuItem: {
    margin: '10px 0',
    fontSize: '30px',
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
      color: `${red.A400}`,
    },
  },
  previewCanvas: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
