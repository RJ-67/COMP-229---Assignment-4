import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Project title is required",
  },

  role: {
    type: String,
    trim: true,
    required: "Role is required",
  },

  description: {
    type: String,
    trim: true,
    required: "Project description is required",
  },

  year: {
    type: String,
    trim: true,
    default: "",
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", ProjectSchema);
