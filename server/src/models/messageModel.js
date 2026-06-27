import mongoose from 'mongoose';
const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    content: String,
    image: String,
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
  },
  { timestamps: true },
);

const Messages = mongoose.model('Message', MessageSchema);
export default Messages;
