import { KeyboardArrowRight, KeyboardArrowLeft, SpaceBar } from '@mui/icons-material';
import { FC } from 'react';

import styles from './GameControl.module.scss';

const GameControl: FC = () => {
  return (
    <div className={styles.GameControl}>
      <KeyboardArrowLeft/> Лево
      <KeyboardArrowRight/> Право
      <SpaceBar/> Прыжок
    </div>
  );
};

export default GameControl;
