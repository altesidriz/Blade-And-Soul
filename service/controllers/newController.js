import { createError } from "../error.js";
import News from "../models/News.js";

export const addNew = async (req, res, next) => {
    const newNew = new News({ userId: req.user.id, ...req.body });
    try {
        const savedNew = await newNew.save();
        res.status(200).json(savedNew);
    } catch (error) {
        next(error)
    }
};

export const updateNew = async (req, res, next) => {
    try {
        const neW = await Post.findById(req.params.id);
        if (!neW) return next(createError(404, 'New not found!'));

        if (req.user.id === neW.userId) {
            const updatedPost = await News.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { neW: true }
            );
            res.status(200).json(updatedPost)
        } else {
            return next(createError(403, 'You have no permission to change this new!'))
        }

    } catch (error) {
        next(error)
    }
};

export const deleteNew = async (req, res, next) => {
    try {
        const neW = await Post.findById(req.params.id);
        if (!neW) return next(createError(404, 'Post not found!'));

        if (req.user.id === neW.userId) {
            await News.findByIdAndDelete(req.params.id);
            res.status(200).json('Post has been deleted!')
        } else {
            return next(createError(403, 'You have no permission to delete this new!'))
        }

    } catch (error) {
        next(error)
    }
};

export const getNew = async (req, res, next) => {
    try {
        const neW = await Post.findById(req.params.id)
        if (!neW) return next(createError(404, 'New not found!'));
        res.status(200).json(neW)
    } catch (error) {
        next(error)
    }
};

export const getAllNews = async (req, res, next) => {
    try {
        const news = await News.find().sort({ _id: -1 });
        res.status(200).json(news)
    } catch (error) {
        next(error);
    }
}

export const getByCategory = async (req, res, next) => {
    // const limit = parseInt(req.query.limit) || 10;
    const category = req.params.category
    try {
        const news = await News.find({category:category});
        res.status(200).json(news)
    } catch (error) {
        next(error);
    }
}