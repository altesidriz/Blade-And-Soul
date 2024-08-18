import express from 'express';
import {
    addItem,
    getAllItems,
    getByCategory,
} from '../controllers/itemController.js';

import { verifyAdmin } from '../verifyAdmin.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//Create a post/topic
router.post('/',verifyToken, verifyAdmin, addItem);
// router.put('/:postId', verifyToken, updatePost);
// router.delete('/:postId', verifyToken, deletePost);
// router.get('/find/:postId', getPost);
router.get('/all', getAllItems);
router.get('/:category', getByCategory);

// router.get('/tags', getByTags);
// router.get('/search', search);

export default router;