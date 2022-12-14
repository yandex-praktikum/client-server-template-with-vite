import { Typography } from '@mui/material';
import { FC, memo } from 'react';

import { useStyles } from './useStyles';

import { TLeaderProps } from '../types';

type TleaderRow = FC<TLeaderProps>;

const LeaderRow: TleaderRow = ({ points, username, position }) => {
  const styles = useStyles();

  return (
    <div className={styles.leaderRow}>
      <div className={styles.nickNameWrapper}>
        <Typography variant={'h2'} className={styles.position}>
          {position}
        </Typography>
        <Typography variant={'h2'} className={styles.nickName}>
          {username}
        </Typography>
      </div>
      <Typography variant={'h2'} className={styles.score}>
        {points}
      </Typography>
      <Typography variant={'h2'} className={styles.points}>
        points
      </Typography>
    </div>
  );
};

const LeaderRowHOC = memo(LeaderRow);
export { LeaderRowHOC as LeaderRow };
