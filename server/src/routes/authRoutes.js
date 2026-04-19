import express from 'express'
const router = express.Router()
import { login, refreshToken, register } from '../controllers/authController.js'


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/refresh-token').get(refreshToken)

export default router