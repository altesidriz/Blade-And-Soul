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
        replies:{
            type:[String],
            default: []
        },
        category: {
            type: String,
        },
        likes: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);