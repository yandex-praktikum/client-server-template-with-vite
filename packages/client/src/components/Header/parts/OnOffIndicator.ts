import { styled } from '@mui/material';

type TOnOffIndicatorProps = { isOnline: boolean; isSsr: boolean };

export const OnOffIndicator = styled('div')(({ isOnline, isSsr }: TOnOffIndicatorProps) => ({
  background: isSsr ? 'orange' : isOnline ? 'green' : 'red',
  width: '10px',
  height: '10px',
  display: 'inline-block',
  borderRadius: '50%',
  position: 'relative',
  top: '-30px',
}));
