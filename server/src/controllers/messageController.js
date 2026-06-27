import cloudinary from '../lib/cloudinary.js';
import Messages from '../models/messageModel.js';
import Conversation from '../models/conversationModel.js';
import { StatusCodes } from 'http-status-codes';
import { getReceiverSocketId, io } from '../lib/socket.js';

const sendMessage = async (req, res) => {
  const { content, image } = req.body;
  const { conversationId } = req.params;
  const sender = req.user.userId;

  const conversation =
    await Conversation.findById(conversationId).populate('participants');
  const receiverId = conversation.participants
    .find((p) => p._id.toString() !== sender)
    ._id.toString();

  let ImageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    ImageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Messages({
    conversationId,
    sender,
    content,
    image: ImageUrl,
  });

  await newMessage.save();

  const updatedConversation = await Conversation.findByIdAndUpdate(
    conversationId,
    {
      latestMessage: newMessage._id,
    },
    { new: true },
  )
    .populate('participants', 'name email avatar')
    .populate('latestMessage');
  await newMessage.populate('sender', 'name email avatar');
  const receiverSocketId = getReceiverSocketId(receiverId);
  console.log('sender:', sender);
  console.log('receiverId:', receiverId);
  console.log('receiverSocketId:', getReceiverSocketId(receiverId));
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', {
      message: newMessage,
      conversation: updatedConversation,
    });
  }

  const senderSocketId = getReceiverSocketId(sender);
  if (senderSocketId) {
    io.to(senderSocketId).emit('newMessage', {
      message: newMessage,
      conversation: updatedConversation,
    });
  }
  res.status(StatusCodes.OK).json(newMessage);
};

const getMessageById = async (req, res) => {
  const { conversationId } = req.params;

  const messages = await Messages.find({ conversationId })
    .populate({
      path: 'sender',
      select: 'name email avatar',
    })
    .sort({ createdAt: 1 });

  res.status(StatusCodes.OK).json(messages);
};

export { sendMessage, getMessageById };
