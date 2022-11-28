import { type Theme } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
  },
  userName: {
    margin: 0,
    padding: 0,
    fontSize: '80px',
    color: theme.palette.secondary.main,
    textAlign: 'right',
  },
  avatar: {
    position: 'relative',
    width: 300,
    height: 300,
    margin: '10px auto 0',
  },
  userInfo: {
    textAlign: 'center',
    margin: theme.spacing(1),
  },
  personIcon: {
    fontSize: '200px',
  },
  uploadBtn: {
    display: 'block',
    margin: '10px auto',
    maxWidth: '100px',
  },
  roundChangeProfile: {
    position: 'absolute',
    width: 700,
    height: 700,
    backgroundColor: grey.A100,
    borderRadius: '50%',
    left: 0,
    top: 0,
    transform: 'translateX(-50%) translateY(25%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  },
  btnChangeProfile: {
    fontSize: '30px',
    maxWidth: '300px',
    marginRight: '40px',
  },
  btnChangePassword: {
    fontSize: '10px',
    maxWidth: '300px',
    marginTop: '140px',
    marginRight: '80px',
    position: 'absolute',
  },
  roundLogout: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 300,
    height: 300,
    backgroundColor: red.A100,
    borderRadius: '50%',
    transform: 'translateX(25%) translateY(25%)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogout: {
    fontSize: '24px',
    marginRight: '20px',
  },
}));
