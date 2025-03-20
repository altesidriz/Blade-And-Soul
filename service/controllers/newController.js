import { createError } from "../error.js";
import News from "../models/News.js";

export const addNew = async (req, res, next) => {
    try {
        // Validation (example using basic checks)
        if (!req.body.title || !req.body.desc || !req.body.category || !req.body.image || !req.body.content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newNew = new News({
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            image: req.body.image,
            content: req.body.content,
        });

        const savedNew = await newNew.save();
        res.status(201).json(savedNew);
    } catch (error) {
        next(error);
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
        const newData = await News.findById(req.params.id)
        if (!newData) return next(createError(404, 'New not found!'));
        res.status(200).json(newData)
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