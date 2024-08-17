import Reply from "../models/Replies.js";
import Post from "../models/Posts.js";
import { createError } from "../error.js";

export const addReply = async (req, res, next) => {
    const { userId, postId, description } = req.body;

    try {
        const newReply = new Reply({ userId, postId, description });
        const savedReply = await newReply.save();

        await Post.findByIdAndUpdate(
            postId,
            { $push: { replies: savedReply._id } },
            { new: true }
        );
        res.status(200).send(savedReply)
    } catch (error) {
        next(error)
    }
};

export const deleteReply = async (req, res, next) => {
    try {
        const reply = await Reply.findById(req.params.id);
        // const post = await Post.findById(req.params.id);

        if(req.user.id === reply.userId){
            await Reply.findByIdAndDelete(req.params.id)
            res.status(200).json("Message was deleted!")
        }else{
            next(createError(403, 'Permision denied!'))
        }
    } catch (error) {
        next(error)
    }
};
export const getAllReplies = async (req, res, next) => {
    try {
        const replies = await Reply.find({postId: req.params.postId})
        res.status(200).json(replies)
        
    } catch (error) {
        next(error)
    }
};