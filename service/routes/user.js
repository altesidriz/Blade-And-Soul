import express from 'express';
import {get, likeComment, deleteUser, update, uploadPictures, deletePicture } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//update user
router.put('/:id', verifyToken, update);

//Delete user
router.delete('/:id', verifyToken, deleteUser);

//Get a user
router.get('/find/:id', get);

//like comment
router.put('/like/:postId', verifyToken, likeComment);

// Upload pictures
router.put('/:id/pictures', verifyToken, uploadPictures);

// Delete picture
router.delete('/:id/pictures', verifyToken, deletePicture);

export default router;