import { createTheme } from '@mui/material/styles';

export const useCustomTheme = createTheme({
  typography: {
    h1: {
      fontWeight: 'bold',
    },
    allVariants: {
      fontFamily: ['Pangolin', 'sans-serif'].join(','),
    },
  },
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
