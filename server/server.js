// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import apiRoutes from "./Routes/api.js";
import authRoutes from "./Routes/authRoutes.js";
import mpesaRoutes from "./Routes/mpesaRoutes.js";
import partnerRoutes from "./Routes/partnerRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://shareserve-frontend.onrender.com'],
  credentials: true
}));

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});
app.use(express.json());

// Mount routes BEFORE connecting to DB
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mpesa", mpesaRoutes);
app.use("/api/contact", partnerRoutes);

// Debug: Log available M-Pesa routes
console.log('Available M-Pesa routes:');
if (mpesaRoutes && mpesaRoutes.stack) {
  mpesaRoutes.stack.forEach(layer => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      console.log(`  ${methods} /api/mpesa${layer.route.path}`);
    }
  });
} else {
  console.log('  No routes found in mpesaRoutes');
}

// Debug: Log available partner routes
console.log('Available partner routes:');
if (partnerRoutes && partnerRoutes.stack) {
  partnerRoutes.stack.forEach(layer => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      console.log(`  ${methods} /api/contact${layer.route.path}`);
    }
  });
} else {
  console.log('  No routes found in partnerRoutes');
}

// Connect to MongoDB separately
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Add a simple test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    routes: ['/api/mpesa/stk-push', '/api/mpesa/test', '/api/mpesa/status/:transactionId']
  });
});

// Serve the test HTML file
app.get('/test-stk-push', (req, res) => {
  res.sendFile('test-stk-push.html', { root: '.' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log("Test endpoints:");
  console.log(`  http://localhost:${PORT}/test`);
  console.log(`  http://localhost:${PORT}/api/mpesa/test`);
  console.log(`  http://localhost:${PORT}/test-stk-push`);
});