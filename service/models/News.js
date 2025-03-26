import mongoose from "mongoose";

const NewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,

    },
    image: {
      type: String,
      required: true,
    },
    content: { 
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("News", NewSchema);