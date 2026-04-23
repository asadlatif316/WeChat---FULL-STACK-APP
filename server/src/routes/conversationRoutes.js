import express from 'express';
const router = express.Router();

import protectUser from '../middlewares/authMiddleware.js';
import { createOrFindConversation, findChatPartners } from '../controllers/conversationController.js';

router.route('/').get(protectUser, findChatPartners);
router.route('/:participantsId').post(protectUser, createOrFindConversation);

export default router;
