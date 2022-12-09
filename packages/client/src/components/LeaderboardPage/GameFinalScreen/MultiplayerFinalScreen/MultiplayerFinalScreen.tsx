import React from 'react';

import { useStyles } from './useStyles';

import { IMultiPLayerScore } from '../../../../services/redux/types/commonState';
import { PlayerRecord } from '../PlayerRecord/PlayerRecord';

type TProps = {
  players: IMultiPLayerScore[];
  currentPlayerId: number | null | undefined;
};

export const MultiplayerFinalScreen = ({ players, currentPlayerId }: TProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {players.map(({ login, color, points, id }, index) => (
        <PlayerRecord
          isCurrentPlayer={currentPlayerId === id}
          place={index + 1}
          name={login}
          color={color}
          points={points}
        />
      ))}
    </div>
  );
};
