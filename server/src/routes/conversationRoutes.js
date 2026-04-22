import express from 'express';
const router = express.Router();

import protectUser from '../middlewares/authMiddleware.js';
import { findChatPartners } from '../controllers/conversationController.js';

router.route('/').get(protectUser, findChatPartners);

export default router;
