import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
  },
  workingHours: {
    weekdays: String,
    weekends: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Contact", contactSchema);
