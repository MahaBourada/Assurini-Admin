import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  refreshToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
