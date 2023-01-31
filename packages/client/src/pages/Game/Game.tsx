import { Gamepad } from '@mui/icons-material';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { EGameStatus } from '@src/enums/gameStatus.enum';
import { GameEndEvent } from '@src/game_modules/types';
import { withAccessRights } from '@src/HOCs';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { useGameControl } from '@src/hooks/useGameControl';
import { setStatus } from '@src/store/reducers/game.reducer';
import { selectGameStatus, selectGameScore } from '@src/store/selectors';
import { IOutletContext } from '@src/utils/OutletContext';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router';

import { GameCanvas } from './components/Canvas';
import GameControl from './components/GameControl';
import ResizeButton from './components/ResizeButton';
import styles from './Game.module.scss';

const Game: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const status = useAppSelector(selectGameStatus);
  const score = useAppSelector(selectGameScore);
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { handleEndOfGame } = useGameControl();

  useEffect(() => {
    if (score) {
      setPageName(`Ваш рекорд: ${score}`);
    } else {
      setPageName('Играем заново');
    }
  }, [score]);

  const handleStartGame = useCallback(() => {
    setTimeout(() => {
      dispatch(setStatus(EGameStatus.PLAY));
    }, 1000);
    dispatch(setStatus(EGameStatus.LOADING));
  }, []);

  const handleEndGame = (e: GameEndEvent) => {
    handleEndOfGame(e);
    dispatch(setStatus(EGameStatus.START));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.game__body}>
        {
          {
            [EGameStatus.START]: (
              <Button onClick={handleStartGame} variant="outlined">
                Играть
              </Button>
            ),
            [EGameStatus.LOADING]: <CircularProgress />,
            [EGameStatus.PLAY]: <GameCanvas innerRef={canvasRef} onGameOver={handleEndGame} />,
          }[status]
        }
      </div>
      <div className={styles.game__footer}>
        <div className={styles.game__control}>
          <Tooltip title={<GameControl />}>
            <Gamepad color="primary" />
          </Tooltip>
          {status === EGameStatus.PLAY && (
            <ResizeButton canvasRef={canvasRef} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAccessRights(Game);
