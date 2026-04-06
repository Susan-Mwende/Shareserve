import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  history: {
    type: String,
    required: true,
  },
  values: [{
    title: String,
    description: String,
  }],
  team: [{
    name: String,
    position: String,
    bio: String,
    image: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.model("About", aboutSchema);
