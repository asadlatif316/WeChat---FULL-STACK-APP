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
io.use((socket, next) => {
  console.log('connection attempt - cookies:', socket.handshake.headers.cookie);
  next();
});

io.use(socketMiddleware);



const onlineMap = {};

console.log('onlineMap:', onlineMap) // add in controller
export function getReceiverSocketId(userId) {
  return onlineMap[userId];
}

io.on('connection', (socket) => {
  console.log('User connected', socket.user.name);
  const userId = socket.userId;
  onlineMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(onlineMap));

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.user.name);
    delete onlineMap[userId];
    io.emit('getOnlineUsers', Object.keys(onlineMap));
  });
});

export { io, server, app };
