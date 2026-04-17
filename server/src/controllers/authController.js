import StatusCodes from 'http-status-codes';
import User from '../models/userModel.js';
import { hashPassword } from '../utils/password.js';

const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login');
};

export { login, register };
