import { Gamepad } from '@mui/icons-material';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import GameControl from './components/GameControl';
import styles from './Game.module.scss';

import { EGameStatus } from '../../enums/gameStatus.enum';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setStatus } from '../../store/reducers/game.reducer';
import { gameStatusSelect } from '../../store/selectors';
import { IOutletContext } from '../../utils/OutletContext';

const Game: FC = () => {
  const { setPageName } = useOutletContext<IOutletContext>();
  const status = useAppSelector(gameStatusSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPageName('Играть');
  }, []);

  const handleStartGame = useCallback(
    () => {
      dispatch(setStatus(EGameStatus.LOADING));
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.game__body}>
        {{
          [EGameStatus.START]: <Button onClick={handleStartGame} variant="outlined">Играть</Button>,
          [EGameStatus.LOADING]: <CircularProgress />,
          [EGameStatus.PLAY]: <div>Игра</div>,
        }[status]}
      </div>
      <div className={styles.game__footer}>
        <div className={styles.game__control}>
          <Tooltip title={<GameControl/>}>
            <Gamepad color={'primary'}/>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Game;
