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
    },
  },
  { timestamps: true }
);

export default mongoose.model("New", NewSchema);