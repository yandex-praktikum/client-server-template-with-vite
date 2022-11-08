import { Alert, Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ColorIndicator } from './parts/ColorIndicator';
import { useStyles } from './useStyles';

import type { TPlayer } from '../../../../shared/types';
import { socket } from '../../services/socket/socket';
import { useAppSelector } from '../../store/hooks';
import { getAuthorInitials } from '../../utils/getAuthorInitials';
import Layout from '../Layout/Layout';

export const WaitingRoomPage = () => {
  // TODO: мб использовать useRef ?
  const { currentGame } = useAppSelector(state => state.common);

  const classes = useStyles();
  const navigate = useNavigate();

  const { roomId, players } = currentGame || {};

  useEffect(() => {
    socket.on('started', () => {
      navigate('/multi-game');
    });
  }, []);

  const { currentUser } = useAppSelector(state => state.common);

  if (!currentGame || !players) {
    navigate('/create-or-join-game');

    return;
  }

  const isConnectedOnePlayer = players.length === 1;
  const isRoomNotFull = players.length > 1 && players.length < 4;
  const isRoomFull = players.length === 4;

  const isHost = players.find((u: TPlayer) => u.user.id === currentUser.id)?.isHost;

  const handleStartGame = () => {
    if (currentGame?.roomId) {
      socket.emit('start', currentGame.roomId);
    } else {
      // TODO: бросить ошибку
    }
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
                    <Avatar src={row.user.avatar}>{getAuthorInitials({ ...row.user })}</Avatar>
                  </TableCell>
                  <TableCell>{[row.user.first_name, row.user.second_name].join(' ')}</TableCell>
                  <TableCell width="100%" align="center">
                    {currentUser.id === row.user.id ? <span className={classes.you}>you</span> : ''}
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
          <Alert severity="error">Share the code to your friends and wait for them to connect to the game.</Alert>
        )}
        {isHost && isRoomNotFull && <Alert severity="info">If everyone is connected to the game, click START</Alert>}
        {isHost && isRoomFull && <Alert severity="success">Room is full, click START!</Alert>}
        {isHost ? (
          <Button
            variant="contained"
            className={classes.startBtn}
            size="large"
            // TODO: вернуть условие
            // disabled={isConnectedOnePlayer}
            onClick={handleStartGame}>
            START
          </Button>
        ) : (
          <Alert severity="info">Wait until the host start the game</Alert>
        )}
      </Paper>
    </Layout>
  );
};
