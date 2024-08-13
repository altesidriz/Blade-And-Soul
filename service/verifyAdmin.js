import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyAdmin = (req, res, next) => {
    console.log('User Data:', req.user);
    // Ensure that verifyToken middleware has already attached the user to req.user
    if (req.user && req.user.role === 'Admin') {
        next(); // User is admin, continue to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }


};



