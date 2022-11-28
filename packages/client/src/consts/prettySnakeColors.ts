import { blue, green, yellow, red } from '@mui/material/colors';

import { TSnakeColor } from '../../../shared/types';

type TPrettyColors = {
  [key in TSnakeColor]: string;
};
export const PRETTY_SNAKE_COLORS: TPrettyColors = {
  blue: blue.A100,
  red: red.A100,
  green: green.A200,
  yellow: yellow.A100,
};
