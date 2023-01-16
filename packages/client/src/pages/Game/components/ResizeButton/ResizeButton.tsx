import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Tooltip } from '@mui/material';
import { FC, RefObject, useCallback } from 'react';

interface IResizeButtonProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const ResizeButton: FC<IResizeButtonProps> = ({ canvasRef }) => {
  const handleClick = useCallback(() => {
    canvasRef?.current?.requestFullscreen();
  }, []);

  return (
    <Tooltip title="Развернуть во весь экран">
      <AspectRatioIcon onClick={handleClick} />
    </Tooltip>
  );
};

export default ResizeButton;
