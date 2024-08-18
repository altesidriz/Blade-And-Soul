import express from 'express';
import {
    addPost,
    deletePost,
    getPost,
    updatePost,
    getAllPosts,
    getByUser,
    search,
    paginate
} from '../controllers/postController.js';

import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//Create a post/topic
router.post('/', verifyToken, addPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
router.get('/find/:id', getPost);
router.get('/all', getAllPosts);
router.get('/users/:userId', getByUser);
router.get('/search', search);
router.get('/paginate', paginate);

export default router;