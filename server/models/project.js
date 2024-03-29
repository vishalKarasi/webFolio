import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  technologies: { type: String, required: true },
  date: { type: Date, required: true },
  url: { type: String, required: true },
});

export const Project = mongoose.model("Project", projectSchema);
