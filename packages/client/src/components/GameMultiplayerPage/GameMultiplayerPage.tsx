import { Button, Paper, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import type { TGame } from '../../../../shared/types';
import { socket } from '../../services/socket/socket';
import { setGame } from '../../store/commonSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Layout from '../Layout/Layout';

// TODO: везде сокет офф нужен - что это я имела ввиду ????

export const GameMultiplayerPage = () => {
  const classes = useStyles();
  const [roomValue, setRoomValue] = useState('');
  const { currentUser } = useAppSelector(state => state.common);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeRoomValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRoomValue(e.target.value.toUpperCase()),
    [setRoomValue]
  );

  useEffect(() => {
    socket.on('createdRoom', (game: TGame) => {
      dispatch(setGame(game));

      navigate('/play-multiplayer');
    });

    socket.on('joinedRoom', (game: TGame) => {
      dispatch(setGame(game));

      navigate('/play-multiplayer');
    });
  }, []);

  const handleCreateRoomClick = () => {
    socket.emit('createRoom', currentUser);
  };

  const handleJoinRoomClick = () => {
    socket.emit('joinRoom', roomValue, currentUser);
  };

  return (
    <Layout>
      <Paper elevation={3} className={classes.wrapper}>
        <h1 className={classes.head}>MULTIPLAYER</h1>

        <Paper elevation={3} className={classes.block}>
          <h2 className={classes.head}>CREATE THE GAME</h2>
          <Button variant="contained" className={classes.btn} onClick={handleCreateRoomClick}>
            GO
          </Button>
        </Paper>
        <Paper elevation={3} className={classes.block}>
          <h2 className={classes.head}>JOIN THE GAME</h2>
          <div className={classes.joinBlock}>
            <TextField
              name="room"
              value={roomValue}
              onChange={changeRoomValue}
              color={'secondary'}
              label={'Enter room code'}
              size="small"
              className={classes.inputRoom}
            />
            <Button variant="contained" className={classes.btn} onClick={handleJoinRoomClick}>
              JOIN
            </Button>
          </div>
        </Paper>
      </Paper>
    </Layout>
  );
};
