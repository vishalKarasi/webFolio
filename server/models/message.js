import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

export const Message = mongoose.model("Message", messageSchema);
