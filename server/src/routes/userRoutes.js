import express from 'express';
const router = express.Router();
import { getUser, updateUser, getAllUsers } from '../controllers/userController.js';
import protectUser from '../middlewares/authMiddleware.js';



router.route('/contacts').get(protectUser, getAllUsers);
router.route('/get-user').get(protectUser,getUser);
router.route('/update-user').get(updateUser);

export default router