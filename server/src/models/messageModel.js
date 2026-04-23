import mongoose from 'mongoose';
import User from './userModel.js';
import Conversation from './conversationModel.js';
const MessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  conversationId: {
    type: mongoose.Types.ObjectId,
    ref: Conversation,
    required: true,
  },
  content: String,
  image: String,
});

const Messages = mongoose.Model('Message', MessageSchema)
export default Messages