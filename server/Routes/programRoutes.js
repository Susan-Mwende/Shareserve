import express from "express";
import Program from "../models/program.js";

const router = express.Router();

// GET all programs
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single program
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create program
router.post("/", async (req, res) => {
  try {
    const program = new Program(req.body);
    const savedProgram = await program.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update program
router.put("/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE program
router.delete("/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;