import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from '../lib/cloudinary.js'

const getAllUsers = async (req, res, next) => {
  try {
    const loggedInUser = req.user.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select('-password');

    res.status(200).json({ filteredUsers });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res) => {
  const user = await User.findOne({_id: req.user.userId}).select('-password')
  res.status(StatusCodes.OK).json({user});
};

const updateUser = async (req, res) => {
  const { user } = req.body
  const userId = req.user.userId

  if (user.profilePicture) {
    const uploadResponse = await cloudinary.uploader.upload(user.profilePicture) 
    user.profilePicture = uploadResponse.secure_url
  }

  const updates = {
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  };

  const updatedUser = await User.findByIdAndUpdate(userId,updates,{new: true})

  res.json({msg: 'update user successfully'});
};

export { getUser, updateUser, getAllUsers };
