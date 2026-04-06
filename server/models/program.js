import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Health", "Education", "Livelihood", "Environment"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "planning"],
    default: "planning",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  budget: {
    target: Number,
    raised: {
      type: Number,
      default: 0,
    },
  },
  location: {
    type: String,
    required: true,
  },
  beneficiaries: {
    type: Number,
    default: 0,
  },
  impact: [{
    metric: String,
    value: String,
  }],
  gallery: [String],
}, {
  timestamps: true,
});

export default mongoose.model("Program", programSchema);