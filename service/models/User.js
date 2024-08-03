import mongoose from "mongoose";

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    characterName: {
      type: String,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    items: [{
        itemName: String,
        itemQuantity: Number,
    }],
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);