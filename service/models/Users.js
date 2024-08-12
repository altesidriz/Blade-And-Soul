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
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'Member'
    },
    wallet: {
      type: Number,
      default: 0,
    },
    items: [{
      itemImage: String,
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