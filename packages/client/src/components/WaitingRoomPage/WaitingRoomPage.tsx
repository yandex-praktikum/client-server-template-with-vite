import { Alert, Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ColorIndicator } from './parts/ColorIndicator';
import { useStyles } from './useStyles';

import { RESOURCES_URL } from '../../../../shared/consts/common';
import type { TPlayer } from '../../../../shared/types';
import { setGame } from '../../services/redux/reducers/common.reducer';
import { getUserSelector } from '../../services/redux/selectors/getUserSelector';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import { socket } from '../../services/socket/socket';
import { getAuthorInitials } from '../../utils/getAuthorInitials';
import { Layout } from '../Layout/Layout';

export const WaitingRoomPage = () => {
  const { data: currentUser } = useAppSelector(getUserSelector);

  const { currentGame } = useAppSelector(state => state.common);
  const { roomId, players } = currentGame || {};

  const isStarted = useRef<boolean>(false);

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('started', () => {
      isStarted.current = true;
      navigate('/multi-game');
    });

    socket.on('changedRoom', game => {
      dispatch(setGame(game));
    });

    if (!currentGame || !players) {
      navigate('/create-or-join-game', { replace: true });
    }

    return () => {
      if (!isStarted.current && !!currentGame && !!currentUser) {
        socket.emit('userDisconnected', currentGame.roomId, currentUser);
        dispatch(setGame(null));
      }

      socket.off('changedRoom');
      socket.off('started');
    };
  }, []);

  if (!currentGame || !players) {
    return null;
  }

  const isConnectedOnePlayer = players.length === 1;
  const isRoomNotFull = players.length > 1 && players.length < 4;
  const isRoomFull = players.length === 4;

  const isHost = players.find((u: TPlayer) => u.user.id === currentUser?.id)?.isHost;

  const handleStartGame = () => {
    socket.emit('start', currentGame.roomId);
  };

  return (
    <Layout>
      <Paper elevation={3} className={classes.wrapper}>
        <h1 className={classes.head}>
          ROOM CODE: <span className={classes.code}>{roomId}</span>
        </h1>
        <h3 className={classes.players}>PLAYERS: {players.length}/4</h3>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableBody>
              {players.map((row: TPlayer) => (
                <TableRow key={row.user.login} className={classes.login}>
                  <TableCell>
                    <Avatar src={RESOURCES_URL + row.user.avatar}>{getAuthorInitials({ ...row.user })}</Avatar>
                  </TableCell>
                  <TableCell>{[row.user.first_name, row.user.second_name].join('\u00a0')}</TableCell>
                  <TableCell width="100%" align="center">
                    {currentUser?.id === row.user.id ? <span className={classes.you}>you</span> : ''}
                  </TableCell>
                  <TableCell>{row.isHost ? <span className={classes.host}>host</span> : ''}</TableCell>
                  <TableCell>
                    <ColorIndicator color={row.color} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isHost && isConnectedOnePlayer && (
          <Alert className={classes.alert} severity="error">
            Share the code to your friends and wait for them to connect to the game.
          </Alert>
        )}
        {isHost && isRoomNotFull && (
          <Alert className={classes.alert} severity="info">
            If everyone is connected to the game, click START
          </Alert>
        )}
        {isHost && isRoomFull && (
          <Alert className={classes.alert} severity="success">
            Room is full, click START!
          </Alert>
        )}
        {isHost ? (
          <Button
            variant="contained"
            className={classes.startBtn}
            size="large"
            disabled={isConnectedOnePlayer}
            onClick={handleStartGame}>
            START
          </Button>
        ) : (
          <Alert className={classes.alert} severity="info">
            Wait for the host to start the game
          </Alert>
        )}
      </Paper>
    </Layout>
  );
};
