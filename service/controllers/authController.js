import mongoose from 'mongoose';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import User from '../models/Users.js';
import { createError } from '../error.js';


export const signup = async (req, res, next) => {
    try {
        const salt = bycrypt.genSaltSync(10);
        const hash = bycrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })

        await newUser.save();
        res.status(200).send('User has been created!');
    } catch (err) {
        // next(err);
        next(createError(400, "Username or email is already in use!"));
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(createError(404, "User not found!"))
        }

        const isCorrect = await bycrypt.compare(req.body.password, user.password);

        if (!isCorrect) {
            return next(createError(400, "Email or password is incorrect!"))
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRETKEY);

        const { password, ...otherDetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(otherDetails);

    } catch (err) {
        next(err)
        // next(createError(500,"Something went wrong!"));
    }
};

export const logout = async (req, res, next) => {
    res.clearCookie("access_token");
    res.status(200).json("Loged out successfully!")
}