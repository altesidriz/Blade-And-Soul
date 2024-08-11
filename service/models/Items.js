import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);