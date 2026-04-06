import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

// GET all donations
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, program, status } = req.query;
    const query = {};
    
    if (program) query.program = program;
    if (status) query.status = status;
    
    const donations = await Donation.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Donation.countDocuments(query);
    
    res.json({
      donations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single donation
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create donation
router.post("/", async (req, res) => {
  try {
    console.log("Received donation data:", req.body);
    
    const donation = new Donation(req.body);
    
    // Generate transaction ID if not provided
    if (!donation.transactionId) {
      donation.transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    }
    
    console.log("Donation to save:", donation);
    
    const savedDonation = await donation.save();
    console.log("Saved donation:", savedDonation);
    
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error("Donation save error:", error);
    res.status(400).json({ message: error.message });
  }
});

// GET donation statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments({ status: "completed" });
    const totalAmount = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    const donationsByProgram = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$program", total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);
    
    const monthlyDonations = await Donation.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 12 }
    ]);
    
    res.json({
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
      donationsByProgram,
      monthlyDonations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
