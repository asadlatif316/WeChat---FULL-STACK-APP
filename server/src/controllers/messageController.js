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
console.log(receiverId);

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

  await Conversation.findByIdAndUpdate(conversationId, {
    latestMessage: newMessage._id,
  });

  await newMessage.populate('sender', 'name email avatar');
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
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
