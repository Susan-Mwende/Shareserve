import express from "express";
import programRoutes from "./programRoutes.js";
import aboutRoutes from "./aboutRoutes.js";
import contactRoutes from "./contactRoutes.js";
import donationRoutes from "./donationRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import adminRoutes from "./adminRoutes.js";
import mpesaRoutes from "./mpesaRoutes.js";
import partnerRoutes from "./partnerRoutes.js";
import galleryRoutes from "./galleryRoutes.js";

const router = express.Router();

// Mount all routes
router.use("/programs", programRoutes);
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
router.use("/donations", donationRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);
router.use("/mpesa", mpesaRoutes);
router.use("/partner", partnerRoutes);
router.use("/gallery", galleryRoutes);

export default router;
