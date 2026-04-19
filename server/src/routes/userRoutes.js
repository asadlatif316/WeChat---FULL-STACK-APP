import express from 'express';
const router = express.Router();
import { getUser, updateUser } from '../controllers/userController.js';

router.route('/get-user').get(getUser);
router.route('/update-user').get(updateUser);

export default router