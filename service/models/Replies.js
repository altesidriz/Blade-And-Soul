import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        postId: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: []
        },
        likes: {
            type: [String],
            default: []
        },
        dislikes: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);