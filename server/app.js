const express=require('express');
const app = express();
const mongoose=require('./config/db');
const apiRoutes=require('./routes/api');

app.use(express.json());
app.use('/api',apiRoutes);
app.listen(3001, ()=>console.log('server on port 3001'));
