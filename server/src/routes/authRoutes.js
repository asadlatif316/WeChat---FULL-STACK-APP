import express from 'express'
const router = express.Router()
import { login, refreshToken, register } from '../controllers/authController.js'
import { validateRegisterInput } from '../middlewares/validateMiddleware.js'

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(login)
router.route('/refresh-token').get(refreshToken)

export default router