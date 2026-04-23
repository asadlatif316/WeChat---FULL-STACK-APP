import mongoose from 'mongoose';
const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Conversation', conversationSchema)