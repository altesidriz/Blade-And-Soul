import express from 'express';
import {
    addNew,
    deleteNew,
    getNew,
    getAllNews,
    getByCategory,
    // search
} from '../controllers/newController.js';

import { verifyToken } from '../verifyToken.js';
import { verifyAdmin } from '../verifyAdmin.js';

const router = express.Router();


router.post('/', verifyToken, verifyAdmin, addNew);
router.delete('/:id', verifyToken, verifyAdmin, deleteNew);
router.get('/find/:id', getNew);
router.get('/all', getAllNews);
router.get('/:category', getByCategory);

export default router;