import { styled } from '@mui/material';

import { TSnakeColor } from '../../../../../shared/types';
import { PRETTY_SNAKE_COLORS } from '../../../consts/prettySnakeColors';

export const ColorIndicator = styled('div')(({ color }: { color: TSnakeColor }) => ({
  width: '20px',
  height: '20px',
  background: PRETTY_SNAKE_COLORS[color],
  borderRadius: '50%',
}));
