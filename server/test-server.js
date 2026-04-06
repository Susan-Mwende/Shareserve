import express from "express";

const app = express();
const PORT = 5001;

app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

// Partner test route
app.get('/api/contact/partner', (req, res) => {
  res.json({ message: 'Partner routes are working!' });
});

app.post('/api/contact/partner', (req, res) => {
  console.log('Received partner request:', req.body);
  res.json({ success: true, message: 'Partner form received!' });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('  GET /test');
  console.log('  GET /api/contact/partner');
  console.log('  POST /api/contact/partner');
});
