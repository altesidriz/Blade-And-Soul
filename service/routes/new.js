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
router.put('/:newId', verifyToken, verifyAdmin, updateNew);
router.delete('/:newId', verifyToken, verifyAdmin, deleteNew);
router.get('/find/:newId', getNew);
router.get('/all', getAllNews);
router.get('/category', getByCategory);
// router.get('/search', search);

export default router;