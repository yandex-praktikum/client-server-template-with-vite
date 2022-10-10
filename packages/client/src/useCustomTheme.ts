import { createTheme } from '@mui/material/styles';

export const useCustomTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#444444',
    },
  },
});
