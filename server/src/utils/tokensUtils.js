import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const generateToken = async (payload, expire) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expire,
  });
  return token;
};

export const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET)
  return decode
}