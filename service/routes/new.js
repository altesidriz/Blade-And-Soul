import express from 'express';
import {
    addNew,
    deleteNew,
    getNew,
    updateNew,
    getAllNews,
    getByCategory,
    // search
} from '../controllers/newController.js';

import { verifyToken } from '../verifyToken.js';
import { verifyAdmin } from '../verifyAdmin.js';

const router = express.Router();

//Create a post/topic
router.post('/', verifyToken, verifyAdmin, addNew);
router.put('/:id', verifyToken, verifyAdmin, updateNew);
router.delete('/:id', verifyToken, verifyAdmin, deleteNew);
router.get('/find/:id', getNew);
router.get('/all', getAllNews);
router.get('/:category', getByCategory);
// router.get('/search', search);

export default router;