import User from '../models/userModel.js';
import Conversation from '../models/conversationModel.js';
import { StatusCodes } from 'http-status-codes';
import Message from '../models/messageModel.js';

const findChatPartners = async (req, res) => {
  const conversation = await Conversation.find({
    participants: { $in: req.user.userId },
  })
    .populate({
      path: 'participants',
      select: 'name email avatar profilePicture about',
    })
    .populate({
      path: 'latestMessage',
    })
    .sort({ updatedAt: -1 });
  const chats = [];
  for (const conv of conversation) {
    const unread = await Message.countDocuments({
      conversationId: conv._id,
      'sender._id': { $ne: req.user.userId },
      status: { $ne: 'read' },
    });
    chats.push({...conv.toObject(), unread});
  }
  console.log(chats);

  res.status(StatusCodes.OK).json({ conversation:chats });
};

const createOrFindConversation = async (req, res) => {
  const { participantsId } = req.params;
  const myId = req.user.userId;

  const conversation = await Conversation.findOne({
    participants: { $all: [req.user.userId, participantsId] },
  });
  if (!conversation) {
    const newConversation = await Conversation.create({
      participants: [req.user.userId, participantsId],
    });
    return res.status(StatusCodes.OK).json(newConversation);
  }

  res.status(StatusCodes.OK).json(conversation);
};
export { findChatPartners, createOrFindConversation };
