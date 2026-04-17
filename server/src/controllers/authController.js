import StatusCodes from 'http-status-codes';
import User from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/password.js';

const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'invalid credentials' })
    return
  }
  console.log(user.password);
  
  const isMatchPassword = await comparePassword(req.body.password, user.password)
  if (!isMatchPassword) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'invalid password' });
    return
  }
  res.status(StatusCodes.OK).json({msg:'user logged in'});
};

export { login, register };
