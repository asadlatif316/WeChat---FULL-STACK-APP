import mongoose from 'mongoose';
import User from './userModel.js';
import Messages from './messageModel.js';
const conversationSchema = mongoose.Schema(
  {
    participants: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: Messages,
      required: true,
    },
  },
  { timeStamp: true },
);

export default mongoose.Model('Conversation', conversationSchema)