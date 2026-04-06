import express from "express";
import Activity from "../models/Activity.js";
import Program from "../models/program.js";
import Impact from "../models/Impact.js";
import Donation from "../models/Donation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projectsRunning = await Program.countDocuments({ status: "active" });
    const totalProjects = await Program.countDocuments();
    const activities = await Activity.find().sort({ date: 1 }).limit(5);
    const impact = await Impact.findOne();
    
    // Get donation statistics
    const totalDonations = await Donation.countDocuments({ status: "completed" });
    const currentMonthDonations = await Donation.countDocuments({
      status: "completed",
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });
    
    const totalAmount = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    // Get program statistics
    const programsByCategory = await Program.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    
    // Calculate total beneficiaries
    const totalBeneficiaries = await Program.aggregate([
      { $group: { _id: null, total: { $sum: "$beneficiaries" } } }
    ]);

    res.json({
      projectsRunning,
      totalProjects,
      activities,
      impact,
      totalDonations,
      currentMonthDonations,
      totalAmount: totalAmount[0]?.total || 0,
      programsByCategory,
      totalBeneficiaries: totalBeneficiaries[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;