import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addReply, deleteReply, getAllReplies } from '../controllers/replyController.js';

const router = express.Router();

router.post('/', verifyToken, addReply);
router.delete('/:id', verifyToken, deleteReply);
router.get('/:postId', getAllReplies);

export default router;