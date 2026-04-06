import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: String,
  date: String,
  status: String,
});

export default mongoose.model("Activity", activitySchema);