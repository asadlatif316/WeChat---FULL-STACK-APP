
import dotenv from 'dotenv'
dotenv.config()

import StatusCodes from 'http-status-codes';
import User from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/tokensUtils.js';
const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'invalid credentials' });
    return;
  }

  const isMatchPassword = await comparePassword(
    req.body.password,
    user.password,
  );
  if (!isMatchPassword) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'invalid password' });
    return;
  }

  const accessToken = await generateToken({ userId: user._id }, '15m');
  const refreshToken = await generateToken({ userId: user._id }, '7d');

  const sevenDays = 7 * 1000 * 60 * 60 * 24;
  res.cookie('token', refreshToken, {
    httpOnly: true,
    maxAge: sevenDays,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'development' ? false : true
  });
  res.status(StatusCodes.OK).json({ accessToken, refreshToken });
};

export { login, register };
