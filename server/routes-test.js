import express from 'express';
import mpesaRoutes from './Routes/mpesaRoutes.js';

const app = express();
app.use(express.json());

// Test the routes directly
app.use('/api/mpesa', mpesaRoutes);

// Test endpoint to verify routes are loaded
app.get('/test-routes', (req, res) => {
  const routes = mpesaRoutes.stack?.map(layer => ({
    path: layer.path,
    method: Object.keys(layer.methods).join(', ')
  })) || [];
  
  res.json({
    success: true,
    message: 'Routes test',
    routes: routes,
    routesCount: routes.length
  });
});

app.listen(5001, () => {
  console.log('Routes test server running on port 5001');
  console.log('Available M-Pesa routes:', routes.length);
});
