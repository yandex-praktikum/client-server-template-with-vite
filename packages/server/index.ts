import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import socketIo from 'socket.io';

import { addCreateRoomEvent, addChangeCursorPositionEvent, addJoinRoomEvent, addStartEvent } from './socket';
import { addDecreaseSnakeEvent } from './socket/addDecreaseSnakeEvent';
import { addUserDisconnectedEvent } from './socket/addUserDisconnectedEvent';

import type { IClientToServerEvents, IServerToClientEvents, TGames } from '../shared/types';

dotenv.config();

const app = express();

const { Server } = socketIo;

const http = require('http');

const server = http.createServer(app);

const io = new Server<IClientToServerEvents, IServerToClientEvents>(server, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: ['http://localhost:3000', 'https://chicago-client.herokuapp.com/'],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
  },
});

app.use(cors());

const port = Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 3001;

const games: TGames = {};

app.get('/', (_, res) => {
  res.json(`👋 Howdy from the server! VERSION: ${process.env.SERVER_VERSION}`);
});

io.on('connection', socket => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // для создания комнаты хостом
  addCreateRoomEvent(socket, games, io);

  // для подключения к созданной комнате
  addJoinRoomEvent(socket, games, io);

  // для вызова начала игры (когда все игроки поключились к комнате и хост нажимает кнопку Старт)
  addStartEvent(socket, games, io);

  // для вызова игроком, чтобы передать текущие координаты мыши
  addChangeCursorPositionEvent(socket, games);

  // для исключения пользователя из игры, когда он подключился к комнате, а затем вышел из нее
  addUserDisconnectedEvent(socket, games, io);

  // для уменьшения длины змеи
  addDecreaseSnakeEvent(socket, games);
});

server.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
