import { blue, green, yellow, red } from '@material-ui/core/colors';

import { TFoodColor } from '../../../shared/types';

type TPrettyColors = {
  [key in TFoodColor]: string;
};
export const PRETTY_FOOD_COLORS: TPrettyColors = {
  blue: blue.A100,
  red: red.A100,
  green: green.A200,
  yellow: yellow.A100,
};
