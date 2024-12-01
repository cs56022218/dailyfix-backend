import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    avatarURL: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
