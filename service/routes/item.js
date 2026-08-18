import express from 'express';
import {
    addItem,
    deleteItem,
    getAllItems,
    getByCategory,
    getItemById,
} from '../controllers/itemController.js';

import { verifyAdmin } from '../verifyAdmin.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addItem);
router.delete('/:itemId', verifyToken, verifyAdmin, deleteItem);
router.get('/:itemId', getItemById);
router.get('/all', getAllItems);
router.get('/category/:category', getByCategory);

export default router;