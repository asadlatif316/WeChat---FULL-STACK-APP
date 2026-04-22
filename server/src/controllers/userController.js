import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';


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
  res.json('update user');
};

export { getUser, updateUser, getAllUsers };
