import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketMiddleware } from '../middlewares/socketAuthMiddleware.js';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketMiddleware);

const onlineMap = {};

io.on('connection', (socket) => {
  console.log('User connected', socket.user.name);
  const userId = socket.userId;
  onlineMap[userId] = socket.id;

  io.emit('getOnlineUser', Object.keys(onlineMap));

  io.on('disconnect', () => {
    console.log('User disconnected', socket.user.name);
    delete onlineMap[userId];
    io.emit('getOnlineUser', Object.keys(onlineMap));
  });
});

export { io, server, app };
