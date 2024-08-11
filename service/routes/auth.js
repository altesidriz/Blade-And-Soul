import express from 'express';
import {
    signup,
    signin,
} from '../controllers/authController.js';

const router = express.Router();

//Create user
router.post('/signup', signup);
//Sign in
router.post('/signin', signin)
//Google auth??
router.post('/google',)
export default router;