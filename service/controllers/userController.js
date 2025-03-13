import { createError } from "../error.js";
import User from '../models/Users.js';
import Post from '../models/Posts.js';

export const update = async (req, res, next) => {
    console.log("Backend Request Body:", req.body);
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }, // Directly use req.body with $set
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You have no permission to update this account!"))
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted!')
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You have no permission to delete this account!"))
    }
};

export const get = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
};

export const likeComment = async (req, res, next) => {
    const id = req.user.id;
    const postId = req.params.postId;

    try {
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: id }
        })
        res.status(200).json('Success')
    } catch (error) {
        next(error)
    }
};

export const uploadPictures = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $push: { pictures: { $each: req.body.pictures } } },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You have no permission to update this account!"));
    }
};

export const deletePicture = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return next(createError(404, "User not found!"));
            }

            // Database deletion only
            user.pictures = user.pictures.filter(pic => pic !== req.body.picture);
            await user.save();

            res.status(200).json({ message: "Image deleted successfully" });
        } catch (error) {
            console.error('Error deleting image from database:', error);
            next(error);
        }
    } else {
        return next(createError(403, "You have no permission to update this account!"));
    }
};

