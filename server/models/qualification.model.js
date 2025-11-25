import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema({
  school: {
    type: String,
    trim: true,
    required: "School is required",
  },
  program: {
    type: String,
    trim: true,
    required: "Program is required",
  },
  year: {
    type: String,
    trim: true,
    required: "Year is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Qualification", QualificationSchema);
