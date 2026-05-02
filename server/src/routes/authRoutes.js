import express from 'express'
const router = express.Router()
import { login, refreshToken, register } from '../controllers/authController.js'
import { validateRegisterInput, loginInputValidation } from '../middlewares/validateMiddleware.js'
import protectUser from '../middlewares/authMiddleware.js'
router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(loginInputValidation, login)
router.route('/refresh-token').get(refreshToken)
router
  .route('/check')
  .get(protectUser, (req, res) => res.status(200).json(req.user));

export default router