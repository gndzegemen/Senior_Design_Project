
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "user",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const Token = mongoose.model("tokens", tokenSchema);
