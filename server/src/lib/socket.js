import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketMiddleware } from '../middlewares/socketAuthMiddleware.js';
import Message from '../models/messageModel.js';
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

console.log('onlineMap:', onlineMap); // add in controller
export function getReceiverSocketId(userId) {
  return onlineMap[userId];
}

io.on('connection', (socket) => {
  const userId = socket.userId;
  onlineMap[userId] = socket.id;
  console.log('emitting onlineUsers:', Object.keys(onlineMap));
  io.emit('getOnlineUsers', Object.keys(onlineMap));

  socket.on('showTyping', (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('showTyping', socket.userId);
    }
  });

  socket.on('stopTyping', (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('stopTyping', socket.userId);
    }
  });

  socket.on('messageDelivered', async ({ messageId, senderId }) => {
    const message = await Message.findById(
      messageId,
      { status: 'delivered' },
      { new: true },
    );
    const receiverSocketId = getReceiverSocketId(senderId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('messageStatusUpdated', {
        messageId,
        messageStatus: 'delivered',
      });
    }
  });

  socket.on('readMessage', async ({ conversationId, senderId }) => {
    const messages = await Message.find(
      {
        conversationId,
        status: { $ne: 'read' },
      },
      { status: 'read' },
    );
    const messageIds = messages.map((msg) => msg._id);
    if (messageIds.length === 0) return;
    await Message.updateMany({ _id: { $in: messageIds } }, { status: 'read' });
    const senderSocketId = onlineMap[senderId];
    if (senderSocketId) {
      io.to(senderSocketId).emit('messageReadUpdate', {
        messageIds,
        messageStatus: 'read',
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.user.name);
    delete onlineMap[userId];
    io.emit('getOnlineUsers', Object.keys(onlineMap));
  });
});

export { io, server, app };
