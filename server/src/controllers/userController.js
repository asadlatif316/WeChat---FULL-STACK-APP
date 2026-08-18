import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from '../lib/cloudinary.js';

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
  const user = await User.findOne({ _id: req.user.userId }).select('-password');
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { name, about, profilePicture } = req.body;
  const userId = req.user.userId;

  const updates = {};
  if (name) updates.name = name;
  if (about !== undefined) updates.about = about;

  if (profilePicture) {
    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    updates.profilePicture = uploadResponse.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updates,
    { new: true },
    { runValidators: true },
  );

  res.json({ msg: 'update user successfully', user: updatedUser });
};

export { getUser, updateUser, getAllUsers };
