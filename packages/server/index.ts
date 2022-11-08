import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import socketIo from 'socket.io';

import { addCreateRoomEvent, addChangeCursorPositionEvent, addJoinRoomEvent, addStartEvent } from './socket';

import type { IClientToServerEvents, IServerToClientEvents, TGames } from '../shared/types';

dotenv.config();

const app = express();

const { Server } = socketIo;

const http = require('http');

const server = http.createServer(app);

const io = new Server<IClientToServerEvents, IServerToClientEvents>(server, {
  transports: ['websocket', 'polling'],
  cors: {
    // TODO: set origin for prod (this is client url)
    origin: ['http://localhost:3000', 'https://chicago-api.herokuapp.com/', 'https://chicago-client.herokuapp.com/'],
    // TODO: credentials, method и allowedHeaders - нужно ли???
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
  },
});

app.use(cors());

// process.env.PORT и SERVER_PORT - можно ли как-то сократить ???
const port = Number(process.env.PORT) || Number(process.env.SERVER_PORT) || 3001;

// TODO:
// сейчас все данные об играх хранятся в мутирующейся переменной games
// возможно нужно хранить в базе данных это
const games: TGames = {};

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
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

  // TODO: добавить событие на завершение игры
  // TODO: добавить событие, если игрок оключился от игры + оповещение на фронте
  // TODO: добавить событие, если отключился хост до начала игры + обработать это на фронте
  // TODO: добавить событие или аргументы для boost игрока
});

server.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
