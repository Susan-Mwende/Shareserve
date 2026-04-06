import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  donationType: {
    type: String,
    enum: ["one-time", "monthly", "annual"],
    default: "one-time",
  },
  program: {
    type: String,
    enum: ["Health", "Education", "Livelihood", "General"],
    default: "General",
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
  },
  paymentMethod: {
    type: String,
    enum: ["credit-card", "paypal", "bank-transfer", "mobile-money"],
    required: true,
  },
  transactionId: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Donation", donationSchema);
