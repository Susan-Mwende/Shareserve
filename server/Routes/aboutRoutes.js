import express from "express";
import About from "../models/About.js";

const router = express.Router();

// GET about information
router.get("/", async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default about if none exists
      about = new About({
        mission: "Our mission is to make a positive impact in communities",
        vision: "Our vision is a world where everyone has access to basic needs",
        history: "Our organization was founded to address community challenges",
        values: [],
        team: []
      });
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update about information
router.put("/", async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
