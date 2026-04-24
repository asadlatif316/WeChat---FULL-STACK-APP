import User from '../models/userModel.js';
import Conversation from '../models/conversationModel.js';
import { StatusCodes } from 'http-status-codes';

const findChatPartners = async (req, res) => {
  const conversation = await Conversation.find({
    participants: { $in: req.user.userId },
  })
    .populate({
      path: 'participants',
      select: 'name email avatar',
    })
    .populate({
      path: 'latestMessage',
    })
    .sort({ updatedAt: -1 });

  res.status(StatusCodes.OK).json({ conversation });
};

const createOrFindConversation = async (req, res) => {
  const { participantsId } = req.params;
  const myId = req.user.userId
  
  const conversation = await Conversation.findOne({
    participants: { $all: [req.user.userId, participantsId] },
  });
  if (!conversation) {
    const newConversation = await Conversation.create({ participants: [req.user.userId, participantsId] })
    return res.status(StatusCodes.OK).json(newConversation)
  }

  res.status(StatusCodes.OK).json(conversation)
};
export { findChatPartners, createOrFindConversation };
