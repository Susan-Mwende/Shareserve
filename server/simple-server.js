// Simple server for testing partner routes
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import partnerRoutes from "./Routes/partnerRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.use(express.json());

// Mount partner routes
app.use("/api/contact", partnerRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Simple server is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shareserve')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    // Don't exit, continue without MongoDB for now
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Simple server running on port ${PORT}`);
  
  // Log available routes
  console.log('Available partner routes:');
  if (partnerRoutes && partnerRoutes.stack) {
    partnerRoutes.stack.forEach(layer => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
        console.log(`  ${methods} /api/contact${layer.route.path}`);
      }
    });
  }
  
  console.log('Test endpoints:');
  console.log(`  http://localhost:${PORT}/test`);
  console.log(`  http://localhost:${PORT}/api/contact/partner`);
});
