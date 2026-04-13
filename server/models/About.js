import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  mission: {
    type: String,
    default: "",
  },
  vision: {
    type: String,
    default: "",
  },
  history: {
    type: String,
    default: "",
  },
  values: [{
    title: String,
    description: String,
    icon: String,
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
