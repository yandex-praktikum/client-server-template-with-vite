import React, { useLayoutEffect, useState } from 'react';

import { useStyles } from './useStyles';

import cursor from '../../../public/cursor.svg';

const CustomCursor = () => {
  const classes = useStyles();
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useLayoutEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    addEventListener('mousemove', mouseMoveHandler);

    return () => {
      removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <img
      src={cursor}
      alt={''}
      className={classes.wrapper}
      style={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
    />
  );
};

export default CustomCursor;
