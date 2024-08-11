import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
        },
        userId: {
            type: Number,
        },
        category: {
            type: String,
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