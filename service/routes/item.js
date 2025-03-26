import express from 'express';
import {
    addItem,
    getAllItems,
    getByCategory,
    getItemById,
} from '../controllers/itemController.js';

import { verifyAdmin } from '../verifyAdmin.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/',verifyToken, verifyAdmin, addItem);
router.get('/:itemId', getItemById);
router.get('/all', getAllItems);
router.get('/category/:category', getByCategory);

export default router;