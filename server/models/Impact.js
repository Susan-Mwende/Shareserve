import mongoose from "mongoose";

const impactSchema = new mongoose.Schema({
  beneficiaries: Number,
  schools: Number,
  trainings: Number,
  households: Number,
});

export default mongoose.model("Impact", impactSchema);