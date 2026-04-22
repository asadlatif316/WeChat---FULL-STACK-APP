import User from '../models/userModel.js';

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
  res.json('update user');
};

const updateUser = async (req, res) => {
  res.json('update user');
};

export { getUser, updateUser, getAllUsers };
