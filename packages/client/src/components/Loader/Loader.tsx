import { Typography } from '@mui/material';
import React from 'react';

import { useStyles } from './useStyles';

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.snakeCase}>
        <Typography variant={'h1'} className={classes.text}>
          Loading
        </Typography>
        {Array(5)
          .fill('')
          .map((_, index) => {
            return (
              <div
                className={classes.snakePart}
                style={{ animation: `pulse_${index} 2s infinite ease-in-out`, left: 95 + index * 40 }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Loader;
