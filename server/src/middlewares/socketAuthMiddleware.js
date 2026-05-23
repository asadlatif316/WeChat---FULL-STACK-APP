import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { NotFoundError, UnauthorizedError } from '../errors/customError.js';

export const socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split('; ')
      .find((row) => row.startsWith('jwt='))
      ?.split('=')[1];
    if (!token) {
      console.log('Socket Connection rejected: No token provided');
      return next(new Error('Unauthorized - No token provided'));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      console.log('Socket Connection rejected: No token provided');
      return next(new Error('Unauthorized - No token provided'));
    }

    const user = await User.findById(decode.userId).select('-password');
    if (!user) {
      console.log('Socket Connection rejected: User not found');
      return next(new Error('User not found'));
    }

    socket.user = user;
    socket.userId = user._id.toString();
    console.log(`Socket authenticated for user ${user.name} ${user._id}`);
    console.log(token);
    next();

  } catch (error) {
    console.log('Error in authentication', error.message);
    return next(new Error('Unauthorized - Authentication failed'));
    return next();
  }
};
