import {
  Alert,
  Avatar,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import type { TPlayer } from '../../../../shared/types';
import { socket } from '../../services/socket/socket';
import { useAppSelector } from '../../store/hooks';
import { getAuthorInitials } from '../../utils/getAuthorInitials';
import Layout from '../Layout/Layout';

// TODO: аватаркам цвет изменить на нейтральный

// TODO: вынести в parts + сделать реальные цвета (красивые)
const ColorIndicator = styled('div')(({ color }: { color: 'red' | 'green' | 'blue' | 'yellow' }) => ({
  width: '20px',
  height: '20px',
  background: color,
  borderRadius: '50%',
}));

export const PlayMultiplayerPage = () => {
  // TODO: мб использовать useRef ?
  const { currentGame } = useAppSelector(state => state.common);

  const classes = useStyles();
  const navigate = useNavigate();

  const { roomId, players } = currentGame || {};

  useEffect(() => {
    socket.on('started', () => {
      navigate('/online');
    });
  }, []);

  const { currentUser } = useAppSelector(state => state.common);

  if (!currentGame || !players) {
    // TODO: это зачем?
    return <>loading</>;
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
        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {players.map((row: TPlayer) => (
                // TODO: можно ли вынести стили
                <TableRow key={row.user.login} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Avatar sx={{ bgcolor: row.color }} src={row.user.avatar}>
                      {getAuthorInitials({ ...row.user })}
                    </Avatar>
                  </TableCell>
                  <TableCell width="100%">{[row.user.first_name, row.user.second_name].join(' ')}</TableCell>
                  <TableCell>
                    <ColorIndicator color={row.color} />
                  </TableCell>
                  <TableCell>
                    {/* TODO: это по центру лучше и по середине */}
                    {currentUser.id === row.user.id ? <span className={classes.you}>you</span> : ''}
                  </TableCell>
                  {/* TODO: хоста не предпоследнее место */}
                  <TableCell>{row.isHost ? <span className={classes.host}>host</span> : ''}</TableCell>
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
