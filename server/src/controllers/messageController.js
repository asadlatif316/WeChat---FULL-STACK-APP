import cloudinary from '../lib/cloudinary.js';
import Messages from '../models/messageModel.js';
import Conversation from '../models/conversationModel.js';
import { StatusCodes } from 'http-status-codes';

const sendMessage = async (req, res) => {
  const { content, image } = req.body;
  const { conversationId } = req.params;
  const sender = req.user.userId;

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

  res.status(StatusCodes.OK).json(newMessage);
};

const getMessageById = async (req, res) => {
  res.json('get message');
};

export { sendMessage, getMessageById };
