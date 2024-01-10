import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: String, required: true },
  message: { type: String, required: true },
});

export const Review = mongoose.model("Review", reviewSchema);
