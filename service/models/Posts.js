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
        userId: {
            type: String,
        },
        replies:{
            type:[String],
            default: []
        },
        category: {
            type: String,
            enum: ["Service Issues", "Game Update", "Bugs & Issues", "Items & Market", "General Discussion", "PvP", "PvE"],
        },
        likes: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);