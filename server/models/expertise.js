import mongoose from "mongoose";

const expertiseSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  level: { type: String, required: true },
});

export const Expertise = mongoose.model("Expertise", expertiseSchema);
