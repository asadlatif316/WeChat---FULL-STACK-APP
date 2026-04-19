import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
const withValidationError = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationError([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('name must be between 3 to 20 characters long')
    .trim(),
  body('email')
    .notEmpty()
    .withMessage(' email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('email already exist');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);

export const loginInputValidation = withValidationError([
  body('email')
    .notEmpty()
    .withMessage(' email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);
