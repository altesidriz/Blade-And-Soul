import express from 'express';
import {
    signup,
    signin,
    logout,
} from '../controllers/authController.js';

const router = express.Router();

//Create user
router.post('/signup', signup);
//Sign in
router.post('/signin', signin);
//Logout
router.get('/logout', logout)

//Google auth??
router.post('/google',)

export default router;