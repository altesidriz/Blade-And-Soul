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
            default:[]
        },
        userId: {
            type: String,
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
        }
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);