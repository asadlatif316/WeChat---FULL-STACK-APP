import express from 'express';
const router = express.Router();
import { sendMessage, getMessageById } from '../controllers/messageController.js';
import protectUser from '../middlewares/authMiddleware.js';

router.route('/:conversationId').post(protectUser, sendMessage);
router.route('/:conversationId').get(protectUser, getMessageById);

export default router;
