import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) return next(createError(401, "You have not authenticated!"));

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!")); //Maybe if(!token) -> not sure
        req.user = user;
        next()
    })
};


