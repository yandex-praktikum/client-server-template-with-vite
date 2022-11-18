import { styled, colors } from '@mui/material';

import { TSnakeColor } from '../../../../../shared/types';
import { PRETTY_SNAKE_COLORS } from '../../../consts/prettySnakeColors';

export const ColorIndicator = styled('div')(({ color }: { color: TSnakeColor }) => ({
  width: '30px',
  height: '30px',
  background: PRETTY_SNAKE_COLORS[color],
  borderRadius: '50%',
  boxShadow: `0 0 6px 2px ${colors.grey['800']}`,
}));
