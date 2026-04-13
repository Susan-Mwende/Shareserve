import express from "express";
import Value from "../models/Value.js";

const router = express.Router();

// GET all values
router.get("/", async (req, res) => {
  try {
    const values = await Value.find().sort({ order: 1, createdAt: 1 });
    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single value
router.get("/:id", async (req, res) => {
  try {
    const value = await Value.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "Value not found" });
    }
    res.json(value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new value
router.post("/", async (req, res) => {
  try {
    const value = new Value(req.body);
    const savedValue = await value.save();
    res.status(201).json(savedValue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update value
router.put("/:id", async (req, res) => {
  try {
    const value = await Value.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!value) {
      return res.status(404).json({ message: "Value not found" });
    }
    res.json(value);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE value
router.delete("/:id", async (req, res) => {
  try {
    const value = await Value.findByIdAndDelete(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "Value not found" });
    }
    res.json({ message: "Value deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
