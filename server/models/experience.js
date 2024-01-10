import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const Experience = mongoose.model("Experience", experienceSchema);
