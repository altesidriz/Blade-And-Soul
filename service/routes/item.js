import express from 'express';
import {
    addItem,
} from '../controllers/itemController.js';

import { verifyAdmin } from '../verifyAdmin.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//Create a post/topic
router.post('/',verifyToken, verifyAdmin, addItem);
// router.put('/:postId', verifyToken, updatePost);
// router.delete('/:postId', verifyToken, deletePost);
// router.get('/find/:postId', getPost);
// router.get('/all', getAllPosts);
// router.get('/tags', getByTags);
// router.get('/search', search);

export default router;