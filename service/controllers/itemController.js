import { createError } from "../error.js";
import Item from "../models/Items.js";
import User from '../models/Users.js';


export const addItem = async (req, res, next) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (error) {
        next(error)
    }
};

export const getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items)
    } catch (error) {
        next(error);
    }
}

export const getByCategory = async (req, res, next) => {
    const category = req.params.category
    try {
        const items = await Item.find({category:category});
        res.status(200).json(items)
    } catch (error) {
        next(error);
    }
}

// export const updatePost = async (req, res, next) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) return next(createError(404, 'Post not found!'));

//         if (req.user.id === post.userId) {
//             const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
//                 $set: req.body
//             },
//                 { new: true }
//             );
//             res.status(200).json(updatedPost)
//         } else {
//             return next(createError(403, 'You have no permission to change this post!'))
//         }

//     } catch (error) {
//         next(error)
//     }
// };

// export const deletePost = async (req, res, next) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) return next(createError(404, 'Post not found!'));

//         if (req.user.id === post.userId) {
//             await Post.findByIdAndDelete(req.params.id);
//             res.status(200).json('Post has been deleted!')
//         } else {
//             return next(createError(403, 'You have no permission to delete this post!'))
//         }

//     } catch (error) {
//         next(error)
//     }
// };

// export const getPost = async (req, res, next) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         if (!post) return next(createError(404, 'Post not found!'));
//         res.status(200).json(post)
//     } catch (error) {
//         next(error)
//     }
// };

// export const getAllPosts = async (req, res, next) => {
//     try {
//         const posts = await Post.find().sort({ _id: -1 });
//         res.status(200).json(posts)
//     } catch (error) {
//         next(error);
//     }
// }

// export const getByTags = async (req, res, next) => {
//     const limit = parseInt(req.query.limit) || 10;
//     const tags = req.query.tags?.split(',');
//     try {
//         const posts = await Post.find({tags:{$in:tags}}).limit(limit);
//         res.status(200).json(posts)
//     } catch (error) {
//         next(error);
//     }
// }

// export const search = async (req, res, next) => {
//     const limit = parseInt(req.query.limit) || 10;
//     const query = req.query.q
//     try {
//         const posts = await Post.find({title: {$regex: query, $options: "i"}
//         }).limit(limit);
//         res.status(200).json(posts)
//     } catch (error) {
//         next(error);
//     }
// }