import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { FC } from 'react';

import styles from './GameControl.module.scss';

const GameControl: FC = () => {
  return (
    <div className={styles.GameControl}>
      <KeyboardArrowUp /> Прыжок
      <KeyboardArrowDown /> Пригнуться
    </div>
  );
};

export default GameControl;
