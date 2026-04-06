import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// GET contact information
router.get("/", async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      // Create default contact if none exists
      contact = new Contact({
        email: "info@shareserve.org",
        phone: "+1234567890",
        address: "123 Main Street",
        city: "Nairobi",
        country: "Kenya",
        postalCode: "00100",
        socialMedia: {},
        workingHours: {
          weekdays: "9:00 AM - 5:00 PM",
          weekends: "Closed"
        }
      });
      await contact.save();
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update contact information
router.put("/", async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact(req.body);
    } else {
      Object.assign(contact, req.body);
    }
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
