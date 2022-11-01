import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useStyles } from './useStyles';

import cursor from '../../../public/cursor.svg';
import { CUSTOM_EVENTS } from '../../utils/enums';

const CustomCursor = () => {
  const classes = useStyles();
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    addEventListener('mousemove', mouseMoveHandler);

    return () => {
      removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  useEffect(() => {
    const cursorHoverHandler = () => {
      setIsHovered(true);
      setTimeout(() => setIsHovered(false), 300);
    };

    addEventListener(CUSTOM_EVENTS.CURSOR_HOVER, cursorHoverHandler);

    return () => {
      removeEventListener(CUSTOM_EVENTS.CURSOR_HOVER, cursorHoverHandler);
    };
  }, []);

  return (
    <img
      src={cursor}
      alt={''}
      className={`${classes.wrapper} ${isHovered && classes.cursorAnimation}`}
      style={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
    />
  );
};

export default CustomCursor;
