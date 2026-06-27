import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketMiddleware } from '../middlewares/socketAuthMiddleware.js';
import Message from '../models/messageModel.js';
import Conversation from '../models/conversationModel.js';
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

io.on('connection', async (socket) => {
  const userId = socket.userId;
  onlineMap[userId] = socket.id;
  console.log('emitting onlineUsers:', Object.keys(onlineMap));
  io.emit('getOnlineUsers', Object.keys(onlineMap));

  const conversations = await Conversation.find({ participants: userId });

  const conversationIds = conversations.map((c) => c._id);

  const pending = await Message.find({
    conversationId: { $in: conversationIds },
    sender: { $ne: userId },
    status: 'sent',
  });

  if (pending.length > 0) {
    const messageIds = pending.map((m) => m._id);
    await Message.updateMany(
      { _id: { $in: messageIds } },
      { status: 'delivered' },
    );

    const bySender = {};
    for (const msg of pending) {
      const sId = msg.sender._id.toString();
      if (!bySender[sId]) bySender[sId] = [];
      bySender[sId].push(msg._id);
    }

    for (const senderId in bySender) {
      const senderSocketId = onlineMap[senderId];
      console.log(
        'OFFLINE DELIVERED → sender:',
        senderId,
        'socket:',
        senderSocketId,
        'ids:',
        bySender[senderId],
      );
      if (senderSocketId) {
        io.to(senderSocketId).emit('messageStatusUpdated', {
          messageIds: bySender[senderId],
          messageStatus: 'delivered',
        });
      }
    }
  }

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
    const message = await Message.findByIdAndUpdate(
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
    console.log('unread found:', messages.length);
    const messageIds = messages.map((msg) => msg._id);
    if (messageIds.length === 0) {
      console.log('nothing to update, return');
      return;
    }
    await Message.updateMany({ _id: { $in: messageIds } }, { status: 'read' });
    const senderSocketId = onlineMap[senderId];
    console.log('emitting to:', senderId, 'socket:', senderSocketId);

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
