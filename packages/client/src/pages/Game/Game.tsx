import { Gamepad } from '@mui/icons-material';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { GameCanvas } from './components/Canvas';
import GameControl from './components/GameControl';
import styles from './Game.module.scss';

import { gameStateEnum } from '../../enums/gameState.enum';
import { IOutletContext } from '../../utils/OutletContext';

const Game: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const [state, setState] = useState(gameStateEnum.START);

  useEffect(() => {
    setPageName('Играть');
  }, []);

  const handleStartGame = useCallback(() => {
    setState(gameStateEnum.GAME);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.game__body}>
        {
          {
            [gameStateEnum.START]: (
              <Button onClick={handleStartGame} variant="outlined">
                Играть
              </Button>
            ),
            [gameStateEnum.LOADING]: <CircularProgress />,
            [gameStateEnum.GAME]: <GameCanvas />,
          }[state]
        }
      </div>
      <div className={styles.game__footer}>
        <div className={styles.game__control}>
          <Tooltip title={<GameControl />}>
            <Gamepad color={'primary'} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Game;
