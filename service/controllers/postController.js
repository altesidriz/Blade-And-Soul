import { createError } from "../error.js";
import Post from "../models/Posts.js";

export const addPost = async (req, res, next) => {
    const newPost = new Post({ userId: req.user.id, ...req.body });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        next(error)
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(createError(404, 'Post not found!'));

        if (req.user.id === post.userId) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            res.status(200).json(updatedPost)
        } else {
            return next(createError(403, 'You have no permission to change this post!'))
        }

    } catch (error) {
        next(error)
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(createError(404, 'Post not found!'));

        if (req.user.id === post.userId) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json('Post has been deleted!')
        } else {
            return next(createError(403, 'You have no permission to delete this post!'))
        }

    } catch (error) {
        next(error)
    }
};

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        
        if (!post) return next(createError(404, 'Post not found!'));
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.status(200).json(posts)
    } catch (error) {
        next(error);
    }
}

export const getByUser = async (req, res, next) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts)
    } catch (error) {
        next(error);
    }
}

export const getByTags = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10;
    const tags = req.query.tags?.split(',');
    try {
        const posts = await Post.find({tags:{$in:tags}}).limit(limit);
        res.status(200).json(posts)
    } catch (error) {
        next(error);
    }
}


export const search = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.q
    try {
        const posts = await Post.find({title: {$regex: query, $options: "i"}
        }).limit(limit);
        res.status(200).json(posts)
    } catch (error) {
        next(error);
    }
}

export const paginate = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.q || '';
    
        const filter = searchQuery ? {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } }
          ]
        } : {};
    
        const posts = await Post.find(filter).skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments(filter);
    
        const totalPages = Math.ceil(totalPosts / limit);
    
        res.json({
          posts,
          totalPages,
          currentPage: page,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
      }
}